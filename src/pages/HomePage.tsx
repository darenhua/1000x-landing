import { Markdown } from "../components/Markdown";
import homeContent from "../content/home.md" with { type: "text" };

export function HomePage() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Welcome</span>
      <Markdown content={homeContent} />
    </div>
  );
}
