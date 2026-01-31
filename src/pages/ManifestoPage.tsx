import { Markdown } from "../components/Markdown";
import manifestoContent from "../content/manifesto.md" with { type: "text" };

export function ManifestoPage() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">manifesto, v0</span>

      <Markdown content={manifestoContent} />
    </div>
  );
}
