import tailwind from "bun-plugin-tailwind";
import { cp } from "node:fs/promises";

await Bun.build({
  entrypoints: ["./index.html"],
  outdir: "./dist",
  minify: true,
  plugins: [tailwind],
});

// Copy public folder to dist
await cp("./public", "./dist", { recursive: true });

console.log("Build complete!");
