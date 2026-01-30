import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";
import { ManifestoPage } from "./pages/ManifestoPage";
import { WaitlistPage } from "./pages/WaitlistPage";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../components/ui/drawer";

type Route = "manifesto" | "waitlist";

const CELL_WIDTH = 96; // 6rem = 96px
const CELL_HEIGHT = 32; // 2rem = 32px
const MOBILE_BREAKPOINT = 640; // px

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>("manifesto");
  const [darkMode, setDarkMode] = useState(false);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0, isMobile: false, isCompact: false });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const updateGridSize = () => {
      const cols = Math.floor(window.innerWidth / CELL_WIDTH);
      const rows = Math.floor(window.innerHeight / CELL_HEIGHT);
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const isCompact = cols <= 4;
      setGridSize({ cols, rows, isMobile, isCompact });
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  const routes: { name: Route; label: string }[] = [
    { name: "manifesto", label: "Manifesto" },
    { name: "waitlist", label: "Waitlist" },
  ];

  const renderContent = () => {
    switch (currentRoute) {
      case "manifesto":
        return <ManifestoPage />;
      case "waitlist":
        return <WaitlistPage />;
    }
  };

  const { cols, rows, isMobile, isCompact } = gridSize;
  if (cols === 0 || rows === 0) return null;

  // Define regions based on layout - content has fixed height fitting viewport
  const contentStartRow = 2;
  const contentEndRow = rows - 2; // Leave 2 rows at bottom
  const sidebarStartRow = 3;

  let sidebarRegion: { startRow: number; endRow: number; startCol: number; endCol: number };
  let contentRegion: { startRow: number; endRow: number; startCol: number; endCol: number };
  let darkModeCell: { row: number; col: number };

  if (isCompact) {
    // Super small screens: full width content, only 1000x + darkmode in bottom row
    sidebarRegion = { startRow: rows - 1, endRow: rows, startCol: 0, endCol: 1 };
    contentRegion = { startRow: contentStartRow, endRow: contentEndRow, startCol: 0, endCol: cols };
    darkModeCell = { row: rows - 1, col: cols - 1 };
  } else if (isMobile) {
    sidebarRegion = { startRow: rows - 1, endRow: rows, startCol: 0, endCol: cols - 1 };
    contentRegion = { startRow: contentStartRow, endRow: contentEndRow, startCol: 1, endCol: cols - 1 };
    darkModeCell = { row: rows - 1, col: cols - 1 };
  } else {
    // Desktop: 1000x at row 3, then gap at row 4, nav at rows 5-6
    sidebarRegion = { startRow: sidebarStartRow, endRow: sidebarStartRow + 4, startCol: 0, endCol: 1 };
    contentRegion = { startRow: contentStartRow, endRow: contentEndRow, startCol: 2, endCol: Math.min(cols - 2, 12) };
    darkModeCell = { row: rows - 1, col: cols - 1 };
  }

  const isInRegion = (row: number, col: number, region: typeof sidebarRegion) => {
    return row >= region.startRow && row < region.endRow && col >= region.startCol && col < region.endCol;
  };

  const cells = [];

  // Render all background grid cells (skip active regions)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isDarkModeCell = row === darkModeCell.row && col === darkModeCell.col;
      const isInSidebar = isCompact
        ? (row === sidebarRegion.startRow && col === 0)
        : isMobile
        ? (row === sidebarRegion.startRow && col < cols - 1)
        : isInRegion(row, col, sidebarRegion);

      if (isInSidebar || isInRegion(row, col, contentRegion) || isDarkModeCell) {
        continue;
      }

      cells.push(
        <div
          key={`${row}-${col}`}
          className="grid-cell"
          style={{
            gridRow: row + 1,
            gridColumn: col + 1,
          }}
        />
      );
    }
  }

  // Render sidebar nav items with 1000x branding cell
  if (isCompact) {
    // Compact mode: 1000x with hamburger, opens drawer
    cells.push(
      <div
        key="branding"
        className="active-cell bg-foreground"
        style={{
          gridRow: rows,
          gridColumn: 1,
        }}
      >
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <button className="w-full h-full flex items-center justify-center gap-1.5 px-2 text-xs font-medium tracking-wide text-background">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              1000x
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {routes.map((route) => {
                  const isActive = currentRoute === route.name;
                  return (
                    <button
                      key={route.name}
                      onClick={() => {
                        setCurrentRoute(route.name);
                        setDrawerOpen(false);
                      }}
                      className={`p-4 text-sm tracking-wide border transition-colors ${
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:bg-foreground/5"
                      }`}
                    >
                      {route.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  } else if (isMobile) {
    // Mobile: horizontal nav at bottom
    // 1000x branding cell
    cells.push(
      <div
        key="branding"
        className="active-cell bg-foreground"
        style={{
          gridRow: rows,
          gridColumn: 1,
        }}
      >
        <div className="w-full h-full flex items-center justify-center px-2 text-xs font-medium tracking-wide text-background">
          1000x
        </div>
      </div>
    );
    // Nav items
    routes.forEach((route, index) => {
      const isActive = currentRoute === route.name;
      cells.push(
        <div
          key={`nav-${route.name}`}
          className={`active-cell ${isActive ? "selected-cell" : ""}`}
          style={{
            gridRow: rows,
            gridColumn: index + 2,
          }}
        >
          <button
            onClick={() => setCurrentRoute(route.name)}
            className="w-full h-full flex items-center justify-center px-2 text-xs tracking-wide hover:bg-foreground/5 transition-colors"
          >
            {route.label}
          </button>
        </div>
      );
    });
  } else {
    // Desktop: vertical nav on left with gap after 1000x
    // 1000x branding cell
    cells.push(
      <div
        key="branding"
        className="active-cell bg-foreground"
        style={{
          gridRow: sidebarRegion.startRow + 1,
          gridColumn: 1,
        }}
      >
        <div className="w-full h-full flex items-center px-4 text-sm font-medium tracking-wide text-background">
          1000x
        </div>
      </div>
    );
    // Gap cell between 1000x and nav
    cells.push(
      <div
        key="sidebar-gap"
        className="grid-cell"
        style={{
          gridRow: sidebarRegion.startRow + 2,
          gridColumn: 1,
        }}
      />
    );
    // Nav items (start 2 rows below 1000x for the gap)
    routes.forEach((route, index) => {
      const row = sidebarRegion.startRow + index + 2; // +2 for gap
      const isActive = currentRoute === route.name;

      cells.push(
        <div
          key={`nav-${route.name}`}
          className={`active-cell ${isActive ? "selected-cell" : ""}`}
          style={{
            gridRow: row + 1,
            gridColumn: 1,
          }}
        >
          <button
            onClick={() => setCurrentRoute(route.name)}
            className="w-full h-full flex items-center px-4 text-sm tracking-wide hover:bg-foreground/5 transition-colors"
          >
            {route.label}
          </button>
        </div>
      );
    });
  }

  // Render content area with scrollable overflow
  cells.push(
    <div
      key="content"
      className="active-cell overflow-hidden"
      style={{
        gridRow: `${contentRegion.startRow + 1} / ${contentRegion.endRow + 1}`,
        gridColumn: `${contentRegion.startCol + 1} / ${contentRegion.endCol + 1}`,
      }}
    >
      <div className="w-full h-full p-8 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );

  // Dark mode toggle
  cells.push(
    <div
      key="darkmode"
      className="active-cell"
      style={{
        gridRow: rows,
        gridColumn: cols,
      }}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="w-full h-full flex items-center justify-center text-xs hover:bg-foreground/5 transition-colors overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={darkMode ? "sun" : "moon"}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {darkMode ? "☀" : "●"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );

  return (
    <div className="grid-wrapper">
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${CELL_WIDTH}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_HEIGHT}px)`,
        }}
      >
        {cells}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
