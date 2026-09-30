import cor7Logo from "../assets/cor7-logo.asset.json";
import { CategoryBar } from "./CategoryBar";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  activeCategoryId: string | null;
  categories: readonly { id: string; name: string }[];
};

export function Header({ query, onQueryChange, activeCategoryId, categories }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <img src={cor7Logo.url} alt="Cor7 Gastronomia" className="h-10 w-10 rounded-lg object-cover" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar no cardápio"
          aria-label="Buscar item pelo nome"
          className="h-11 min-w-0 flex-1 rounded-full border border-border px-4 text-sm outline-none focus:border-primary"
        />
      </div>
      <CategoryBar categories={categories} activeCategoryId={activeCategoryId} />
    </header>
  );
}
