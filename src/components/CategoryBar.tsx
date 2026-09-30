type CategoryBarProps = {
  categories: readonly { id: string; name: string }[];
  activeCategoryId: string | null;
  onSelectAll?: (() => void) | undefined;
};

export function CategoryBar({ categories, activeCategoryId, onSelectAll }: CategoryBarProps) {
  if (categories.length === 0) return null;

  function scrollTo(id: string) {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleAllClick() {
    if (onSelectAll) {
      onSelectAll();
    }
    const first = categories[0];
    if (first) {
      scrollTo(first.id);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
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
            className={`flex h-11 min-h-11 min-w-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-xs font-medium transition-all active:scale-95 ${
              isActive
                ? "bg-primary font-semibold text-primary-foreground shadow-xs"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            {category.name}
          </button>
        );
      })}

      {/* Opção "Todas" posicionada como o último item */}
      <button
        type="button"
        onClick={handleAllClick}
        aria-label="Ver todas as categorias"
        className="flex h-11 min-h-11 min-w-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 text-xs font-medium text-white/90 transition-all hover:bg-white/15 hover:text-white active:scale-95"
      >
        Todas
      </button>
    </nav>
  );
}
