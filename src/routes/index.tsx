import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { orderedMenu, type MenuCategory } from "../data/menu";
import { Header } from "../components/Header";
import { CategoryBar } from "../components/CategoryBar";
import { CategorySheet } from "../components/CategorySheet";
import { MenuSection } from "../components/MenuSection";
import { Footer } from "../components/Footer";
import { CartBar } from "../components/CartBar";

export const Route = createFileRoute("/")({
  component: MenuIndexPage,
});

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function MenuIndexPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const initialCatId = orderedMenu[0]?.id ?? "";
  const [activeCategory, setActiveCategory] = useState<string>(initialCatId);
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const query = normalizeText(searchQuery.trim());
  const isSearching = isSearchOpen || query.length > 0;

  const filteredMenu: readonly MenuCategory[] = useMemo(() => {
    if (!query) return orderedMenu;
    return orderedMenu
      .map((cat) => {
        const items = cat.items.filter((item) => {
          const matchName = normalizeText(item.name).includes(query);
          const matchDesc = item.description
            ? normalizeText(item.description).includes(query)
            : false;
          const matchGroup = item.group ? normalizeText(item.group).includes(query) : false;
          const matchNote = item.note ? normalizeText(item.note).includes(query) : false;
          const matchOptions = item.options
            ? item.options.some((opt) => normalizeText(opt).includes(query))
            : false;
          return matchName || matchDesc || matchGroup || matchNote || matchOptions;
        });
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  const totalResultsCount = useMemo(() => {
    return filteredMenu.reduce((sum, cat) => sum + cat.items.length, 0);
  }, [filteredMenu]);

  // Keep active category synced if current active is filtered out
  useEffect(() => {
    if (filteredMenu.length > 0) {
      const exists = filteredMenu.some((cat) => cat.id === activeCategory);
      if (!exists) {
        const first = filteredMenu[0];
        if (first) setActiveCategory(first.id);
      }
    }
  }, [filteredMenu, activeCategory]);

  // Track active section via IntersectionObserver when scrolling (only when not in search)
  useEffect(() => {
    if (typeof window === "undefined" || isSearching || filteredMenu.length === 0) return;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      if (isScrollingToRef.current) return;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const catId = entry.target.id.replace("cat-", "");
          setActiveCategory(catId);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-104px 0px -65% 0px",
      threshold: 0,
    });

    for (const cat of filteredMenu) {
      const element = document.getElementById(`cat-${cat.id}`);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [filteredMenu, isSearching]);

  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    isScrollingToRef.current = true;

    window.setTimeout(() => {
      const element = document.getElementById(`cat-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);

    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingToRef.current = false;
      scrollTimeoutRef.current = null;
    }, 850);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-background text-foreground antialiased pb-28">
      <Header
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        onOpenSearch={handleOpenSearch}
        onCloseSearch={handleCloseSearch}
        onSearchChange={setSearchQuery}
      />

      {!isSearching ? (
        <CategoryBar
          categories={filteredMenu}
          activeId={activeCategory}
          onSelectCategory={handleSelectCategory}
          onOpenSheet={() => setIsSheetOpen(true)}
        />
      ) : null}

      {isSearching ? (
        <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2.5">
          <p className="text-xs font-medium text-muted-foreground">
            {totalResultsCount === 0
              ? "Nenhum resultado encontrado"
              : totalResultsCount === 1
                ? "1 resultado encontrado"
                : `${totalResultsCount} resultados encontrados`}
          </p>
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Limpar termo
            </button>
          ) : null}
        </div>
      ) : null}

      <main className="flex-1">
        {filteredMenu.length === 0 ? (
          <div className="animate-fade-in-up px-4 py-16 text-center">
            <p className="font-serif text-lg font-semibold text-foreground">
              Nenhum item encontrado
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Não encontramos resultados para &ldquo;{searchQuery}&rdquo;. Tente buscar por outro
              termo.
            </p>
            <button
              type="button"
              onClick={handleCloseSearch}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-semibold text-foreground hover:bg-secondary/80"
            >
              Ver cardápio completo
            </button>
          </div>
        ) : (
          filteredMenu.map((category) => (
            <MenuSection key={category.id} category={category} items={category.items} />
          ))
        )}
      </main>

      <CategorySheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        categories={orderedMenu}
        activeId={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <Footer />
      <CartBar />
    </div>
  );
}
