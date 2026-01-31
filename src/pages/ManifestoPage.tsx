import { Markdown } from "../components/Markdown";
import manifestoContent from "../content/manifesto.md" with { type: "text" };

interface ManifestoPageProps {
  onNavigateToWaitlist: () => void;
}

export function ManifestoPage({ onNavigateToWaitlist }: ManifestoPageProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">extremely poorly written manifesto, v0</span>

      <Markdown content={manifestoContent} />

      <div className="mt-8 text-sm">
        Interested? I'll be selecting a few people to try it.{" "}
        <button
          onClick={onNavigateToWaitlist}
          className="underline hover:no-underline"
        >
          Join the waitlist
        </button>
      </div>
    </div>
  );
}
