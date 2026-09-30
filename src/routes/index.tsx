import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { menu } from "../data/menu";
import { Header } from "../components/Header";
import { MenuSection } from "../components/MenuSection";
import { CartBar } from "../components/CartBar";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cor7 — Cardápio Digital" },
      {
        name: "description",
        content:
          "Cardápio digital do restaurante Cor7: pratos executivos, porções, bebidas e drinks. Monte seu pedido e envie pelo WhatsApp.",
      },
      { property: "og:title", content: "Cor7 — Cardápio Digital" },
      {
        property: "og:description",
        content: "Monte seu pedido no cardápio do Cor7 e envie direto pelo WhatsApp.",
      },
    ],
  }),
  component: MenuPage,
});

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(menu[0]?.id ?? null);

  const sections = useMemo(() => {
    const term = normalize(query.trim());
    return menu
      .map((category) => ({
        category,
        items: term
          ? category.items.filter((item) => normalize(item.name).includes(term))
          : category.items,
      }))
      .filter((section) => section.items.length > 0);
  }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveCategoryId(visible.target.id.replace("cat-", ""));
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 },
    );
    for (const section of sections) {
      const element = document.getElementById(`cat-${section.category.id}`);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        query={query}
        onQueryChange={setQuery}
        activeCategoryId={activeCategoryId}
        categories={sections.map((section) => section.category)}
      />

      <main>
        {sections.length === 0 ? (
          <p className="px-4 py-16 text-center text-sm text-muted-foreground">
            Nenhum item encontrado.
          </p>
        ) : (
          sections.map((section) => (
            <MenuSection
              key={section.category.id}
              category={section.category}
              items={section.items}
            />
          ))
        )}
      </main>

      <Footer />
      <CartBar />
    </div>
  );
}
