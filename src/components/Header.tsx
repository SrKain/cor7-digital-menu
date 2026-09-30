import { CategoryBar } from "./CategoryBar";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  activeCategoryId: string | null;
  categories: readonly { id: string; name: string }[];
  onSelectAll?: () => void;
};

export function Header({
  query,
  onQueryChange,
  activeCategoryId,
  categories,
  onSelectAll,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#222222] bg-[#111111] text-white shadow-md">
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src="/cor7-logo.jpg"
          alt="Cor7 Gastronomia"
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-xl bg-black object-contain shadow-xs"
        />
        <div className="relative min-w-0 flex-1">
          <input
            type="search"
            value={query}
            maxLength={100}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar no cardápio..."
            aria-label="Buscar item pelo nome"
            className="h-11 min-h-[44px] w-full min-w-0 rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 outline-none transition-colors focus:border-primary focus:bg-white/15 focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <CategoryBar
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectAll={onSelectAll}
      />
    </header>
  );
}
