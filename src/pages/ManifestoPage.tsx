import { Markdown } from "../components/Markdown";
import manifestoContent from "../content/manifesto.md" with { type: "text" };

export function ManifestoPage() {
  return (
    <div className="flex flex-col gap-2">
      <Markdown content={manifestoContent} />
    </div>
  );
}
