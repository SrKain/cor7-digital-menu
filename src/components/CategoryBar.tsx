import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import { CategoriesModal } from "./CategoriesModal";

type CategoryBarProps = {
  categories: readonly { id: string; name: string }[];
  activeCategoryId: string | null;
  onSelectAll?: (() => void) | undefined;
};

export function CategoryBar({ categories, activeCategoryId, onSelectAll }: CategoryBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (categories.length === 0) return null;

  function scrollTo(id: string) {
    if (onSelectAll) {
      onSelectAll();
    }
    setTimeout(() => {
      document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleAllClick() {
    setIsModalOpen(true);
  }

  return (
    <>
      <nav
        aria-label="Categorias do cardápio"
        className="flex items-center gap-2 overflow-x-auto px-4 pb-2.5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain touch-pan-x"
      >
        {categories.map((category) => {
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => scrollTo(category.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Categoria ${category.name}`}
              className={`flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-xs font-medium transition-all active:scale-95 ${
                isActive
                  ? "bg-primary font-semibold text-primary-foreground shadow-xs"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          );
        })}

        {/* Opção "Todas" abre o modal de categorias e itens */}
        <button
          type="button"
          onClick={handleAllClick}
          aria-label="Abrir modal com todas as categorias e itens"
          className="flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center gap-1.5 justify-center whitespace-nowrap rounded-full border border-primary/40 bg-primary/15 px-4 text-xs font-semibold text-primary transition-all hover:bg-primary/25 hover:text-white active:scale-95"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span>Todas</span>
        </button>
      </nav>

      <CategoriesModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        activeCategoryId={activeCategoryId}
        onSelectCategory={(categoryId) => scrollTo(categoryId)}
      />
    </>
  );
}
