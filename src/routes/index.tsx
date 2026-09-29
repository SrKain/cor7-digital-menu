import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { menu, type MenuCategory } from "../data/menu";
import { Header } from "../components/Header";
import { CategoryBar } from "../components/CategoryBar";
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
  const [searchQuery, setSearchQuery] = useState("");
  const initialCatId = menu[0]?.id ?? "";
  const [activeCategory, setActiveCategory] = useState<string>(initialCatId);
  const isScrollingToRef = useRef(false);

  const query = normalizeText(searchQuery.trim());

  const filteredMenu: readonly MenuCategory[] = useMemo(() => {
    if (!query) return menu;
    return menu
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

  // Track active section via IntersectionObserver when scrolling
  useEffect(() => {
    if (typeof window === "undefined" || filteredMenu.length === 0) return;

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
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    });

    for (const cat of filteredMenu) {
      const element = document.getElementById(`cat-${cat.id}`);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [filteredMenu]);

  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`cat-${id}`);
    if (element) {
      isScrollingToRef.current = true;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        isScrollingToRef.current = false;
      }, 700);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-background text-foreground antialiased pb-28">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryBar
        categories={filteredMenu}
        activeId={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <main className="flex-1">
        {filteredMenu.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <p className="font-serif text-lg font-semibold text-foreground">
              Nenhum item encontrado
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Não encontramos resultados para &ldquo;{searchQuery}&rdquo;. Tente buscar por outro
              termo.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-semibold text-foreground hover:bg-secondary/80"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          filteredMenu.map((category) => (
            <MenuSection key={category.id} category={category} items={category.items} />
          ))
        )}
      </main>

      <Footer />
      <CartBar />
    </div>
  );
}
