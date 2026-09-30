type CategoryBarProps = {
  categories: readonly { id: string; name: string }[];
  activeCategoryId: string | null;
};

export function CategoryBar({ categories, activeCategoryId }: CategoryBarProps) {
  if (categories.length === 0) return null;

  function scrollTo(id: string) {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Categorias"
      className="flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => scrollTo(category.id)}
          className={`min-h-11 whitespace-nowrap text-sm ${
            activeCategoryId === category.id
              ? "font-semibold text-primary"
              : "text-muted-foreground"
          }`}
        >
          {category.name}
        </button>
      ))}
    </nav>
  );
}
