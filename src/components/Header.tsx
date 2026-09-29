import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { config } from "../config";

type HeaderProps = {
  isSearchOpen: boolean;
  searchQuery: string;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  onSearchChange: (query: string) => void;
};

export function Header({
  isSearchOpen,
  searchQuery,
  onOpenSearch,
  onCloseSearch,
  onSearchChange,
}: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center border-b border-border bg-background/95 px-4 backdrop-blur-xs">
      {isSearchOpen ? (
        <div className="flex h-full w-full items-center gap-2 transition-all duration-200 motion-reduce:transition-none">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              maxLength={100}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar no cardápio..."
              aria-label="Buscar pratos e bebidas no cardápio"
              className="h-11 w-full rounded-full border border-input bg-secondary/60 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="button"
            onClick={onCloseSearch}
            aria-label="Fechar busca"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-between transition-all duration-200 motion-reduce:transition-none">
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
              {config.restaurantName}
            </h1>
            <p className="text-[11px] text-muted-foreground">{config.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Abrir busca no cardápio"
            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary active:scale-95"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      )}
    </header>
  );
}
