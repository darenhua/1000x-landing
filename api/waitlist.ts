import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SignJWT, importPKCS8 } from "jose";

// Get Google access token using service account credentials
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SA_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google service account credentials");
  }

  const now = Math.floor(Date.now() / 1000);
  const key = await importPKCS8(privateKey, "RS256");

  const jwt = await new SignJWT({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://www.googleapis.com/oauth2/v4/token",
    iat: now,
    exp: now + 3600,
  })
    .setProtectedHeader({ alg: "RS256" })
    .sign(key);

  const tokenResponse = await fetch(
    "https://www.googleapis.com/oauth2/v4/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    }
  );

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

// Append name and email to Google Sheets
async function appendToSheet(name: string, email: string): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID environment variable");
  }

  const accessToken = await getAccessToken();
  const values = [[name, email, new Date().toISOString()]];
  const range = "Sheet1!A:C";

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Google Sheets API error: ${JSON.stringify(error)}`);
  }
}

// Simple email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email } = request.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return response.status(400).json({ error: "Name is required" });
    }

    if (!email || typeof email !== "string") {
      return response.status(400).json({ error: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return response.status(400).json({ error: "Invalid email address" });
    }

    await appendToSheet(name.trim(), email.toLowerCase().trim());

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return response
      .status(500)
      .json({ error: "Failed to join waitlist. Please try again." });
  }
}
