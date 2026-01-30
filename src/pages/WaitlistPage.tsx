import { Markdown } from "../components/Markdown";
import waitlistContent from "../content/waitlist.md" with { type: "text" };

export function WaitlistPage() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Join Us</span>
      <Markdown content={waitlistContent} />
      <div className="mt-4 flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          className="px-3 py-2 text-sm border border-foreground/20 bg-transparent outline-none focus:border-foreground/60 transition-colors"
        />
        <button className="px-4 py-2 text-sm border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-colors">
          Join
        </button>
      </div>
    </div>
  );
}
