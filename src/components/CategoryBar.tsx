import { useEffect, useRef } from "react";
import { LayoutGrid } from "lucide-react";
import type { MenuCategory } from "../data/menu";

type CategoryBarProps = {
  categories: readonly MenuCategory[];
  activeId: string;
  onSelectCategory: (id: string) => void;
  onOpenSheet: () => void;
};

export function CategoryBar({
  categories,
  activeId,
  onSelectCategory,
  onOpenSheet,
}: CategoryBarProps) {
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
      className="sticky top-14 z-40 flex h-12 w-full items-center border-b border-border bg-background/95 backdrop-blur-xs"
    >
      <div
        ref={containerRef}
        className="no-scrollbar flex h-full w-full items-center gap-2 overflow-x-auto overscroll-x-contain touch-pan-x px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              ref={isActive ? activeBtnRef : undefined}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex h-11 min-h-11 min-w-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-xs font-medium transition-all duration-200 ease-out motion-reduce:transition-none active:scale-95 ${
                isActive
                  ? "bg-primary font-semibold text-primary-foreground shadow-xs"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onOpenSheet}
          aria-label="Ver todas as categorias agrupadas"
          className="flex h-11 min-h-11 min-w-[44px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-input bg-background px-4 text-xs font-semibold text-foreground transition-all duration-200 ease-out hover:bg-secondary motion-reduce:transition-none active:scale-95"
        >
          <LayoutGrid className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span>Todas</span>
        </button>
      </div>
    </nav>
  );
}
