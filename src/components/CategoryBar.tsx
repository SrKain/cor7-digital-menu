import { useEffect, useRef } from "react";
import type { MenuCategory } from "../data/menu";

type CategoryBarProps = {
  categories: readonly MenuCategory[];
  activeId: string;
  onSelectCategory: (id: string) => void;
};

export function CategoryBar({ categories, activeId, onSelectCategory }: CategoryBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeBtnRef.current && containerRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeId]);

  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="Categorias do cardápio"
      className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xs"
    >
      <div
        ref={containerRef}
        className="flex items-center gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              ref={isActive ? activeBtnRef : undefined}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`min-h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-primary font-semibold text-primary-foreground shadow-xs"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
