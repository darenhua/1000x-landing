import { useState, useEffect, FormEvent } from "react";

export function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [alreadyJoined, setAlreadyJoined] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("waitlist_joined");
    if (stored) {
      setAlreadyJoined(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !name) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        const joinedData = { name, email };
        localStorage.setItem("waitlist_joined", JSON.stringify(joinedData));
        setAlreadyJoined(joinedData);
        setStatus("success");
        setMessage("You're on the list! We'll notify you when we launch.");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (alreadyJoined) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-foreground flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-medium tracking-tight">You're on the list</h1>
        </div>

        <div className="space-y-4 text-sm">
          <p>
            Thanks for joining, <span className="font-medium">{alreadyJoined.name}</span>.
          </p>
          <p className="text-muted-foreground">
            We'll notify you at <span className="font-medium text-foreground">{alreadyJoined.email}</span> when we launch.
          </p>
        </div>

        <div className="border border-border p-4 text-sm text-muted-foreground">
          Stay tuned for exclusive updates and early access.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-medium tracking-tight mb-2">Join the Waitlist</h1>
        <p className="text-sm text-muted-foreground">
          Be the first to know when we launch. Get early access and exclusive updates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-foreground text-background px-4 py-3 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </form>

      {message && (
        <div
          className={`border p-4 text-sm ${status === "success"
              ? "border-foreground bg-foreground/5"
              : "border-red-500 bg-red-500/5 text-red-500"
            }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
