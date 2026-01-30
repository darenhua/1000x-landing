import { createRoot } from "react-dom/client";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">1000x Marketing</h1>
      <p className="text-muted-foreground text-lg">
        Built with Bun, React, Tailwind CSS, and shadcn/ui
      </p>
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
        <Button variant="secondary">Contact</Button>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);