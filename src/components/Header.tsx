import { Search, X } from "lucide-react";
import { config } from "../config";

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background px-4 pt-5 pb-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              {config.restaurantName}
            </h1>
            <p className="text-xs text-muted-foreground">{config.tagline}</p>
          </div>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar no cardápio..."
            aria-label="Buscar pratos e bebidas no cardápio"
            className="h-11 w-full rounded-xl border border-input bg-secondary/50 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
