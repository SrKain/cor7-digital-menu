import { useState, useMemo } from "react";
import {
  UtensilsCrossed,
  Sparkles,
  Soup,
  Drumstick,
  Sandwich,
  Beef,
  CupSoda,
  Citrus,
  Beer,
  Layers,
  Wine,
  Coffee,
  Cake,
  GlassWater,
  Search,
  X,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { menu, type MenuCategory, type MenuItem } from "../data/menu";
import { formatPrice } from "../lib/format";

type CategoriesModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
  onSelectItem?: (item: MenuItem, categoryId: string) => void;
};

const CATEGORY_ICONS: Record<string, typeof UtensilsCrossed> = {
  "pratos-executivos": UtensilsCrossed,
  "pratos-especiais": Sparkles,
  "cardapio-de-inverno": Soup,
  porcoes: Drumstick,
  pasteis: Sandwich,
  sanduiches: Sandwich,
  hamburgueres: Beef,
  bebidas: CupSoda,
  sucos: Citrus,
  chopp: Beer,
  cervejas: Beer,
  baldes: Layers,
  "drinks-sem-alcool": GlassWater,
  drinks: Wine,
  doses: GlassWater,
  sobremesas: Cake,
  cafes: Coffee,
  vinhos: Wine,
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function CategoriesModal({
  open,
  onOpenChange,
  activeCategoryId,
  onSelectCategory,
  onSelectItem,
}: CategoriesModalProps) {
  const [modalQuery, setModalQuery] = useState("");

  const totalCategories = menu.length;
  const totalItems = useMemo(() => menu.reduce((sum, cat) => sum + cat.items.length, 0), []);

  const cleanQuery = modalQuery.trim();
  const normalizedQuery = normalize(cleanQuery);

  const filteredData = useMemo(() => {
    if (!normalizedQuery) {
      return {
        categories: menu,
        matchingItems: [] as { item: MenuItem; category: MenuCategory }[],
      };
    }

    const matchingCategories: MenuCategory[] = [];
    const matchingItems: { item: MenuItem; category: MenuCategory }[] = [];

    for (const cat of menu) {
      const isCatMatch = normalize(cat.name).includes(normalizedQuery);
      if (isCatMatch) {
        matchingCategories.push(cat);
      }

      for (const item of cat.items) {
        const isItemMatch =
          normalize(item.name).includes(normalizedQuery) ||
          (item.description && normalize(item.description).includes(normalizedQuery)) ||
          (item.group && normalize(item.group).includes(normalizedQuery));

        if (isItemMatch) {
          matchingItems.push({ item, category: cat });
        }
      }
    }

    return {
      categories: matchingCategories,
      matchingItems,
    };
  }, [normalizedQuery]);

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    onOpenChange(false);
  };

  const handleItemClick = (item: MenuItem, categoryId: string) => {
    if (onSelectItem) {
      onSelectItem(item, categoryId);
    } else {
      onSelectCategory(categoryId);
      setTimeout(() => {
        const itemEl = document.getElementById(`item-${item.id}`);
        if (itemEl) {
          itemEl.scrollIntoView({ behavior: "smooth", block: "center" });
          itemEl.classList.add(
            "ring-2",
            "ring-primary",
            "bg-primary/10",
            "transition-all",
            "duration-500",
          );
          setTimeout(() => {
            itemEl.classList.remove("ring-2", "ring-primary", "bg-primary/10");
          }, 1800);
        }
      }, 200);
    }
    onOpenChange(false);
  };

  const handleViewAllTop = () => {
    onOpenChange(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl flex flex-col p-0 gap-0 overflow-hidden bg-neutral-950 border-neutral-800 text-white rounded-2xl shadow-2xl">
        <DialogHeader className="p-4 sm:p-6 pb-3 border-b border-neutral-800/80 bg-neutral-900/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg sm:text-xl font-bold font-serif tracking-wide text-white">
                Categorias & Itens
              </DialogTitle>
              <DialogDescription className="text-xs text-neutral-400 mt-0.5">
                {totalCategories} categorias • {totalItems} opções no cardápio
              </DialogDescription>
            </div>
          </div>

          <div className="relative mt-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="search"
              value={modalQuery}
              onChange={(e) => setModalQuery(e.target.value)}
              placeholder="Buscar categoria ou prato..."
              className="h-10 w-full rounded-xl bg-neutral-800/90 pl-10 pr-9 text-sm text-white placeholder:text-neutral-500 border border-neutral-700/60 focus:border-primary focus:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              autoFocus={false}
            />
            {modalQuery && (
              <button
                type="button"
                onClick={() => setModalQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 [scrollbar-width:thin] overscroll-contain">
          {/* Se houver busca por itens, exibir itens encontrados primeiro */}
          {normalizedQuery && filteredData.matchingItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Itens encontrados ({filteredData.matchingItems.length})
                </span>
                <span className="text-[11px] text-neutral-400">Toque para ver no cardápio</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredData.matchingItems.map(({ item, category }) => (
                  <button
                    key={`${category.id}-${item.id}`}
                    type="button"
                    onClick={() => handleItemClick(item, category.id)}
                    className="flex flex-col text-left p-3 rounded-xl border border-neutral-800 bg-neutral-900/70 hover:bg-neutral-800 hover:border-neutral-700 transition-all text-xs group active:scale-[0.98]"
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <span className="font-semibold text-neutral-100 text-sm group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <span className="font-semibold text-primary shrink-0">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500">
                      <span className="bg-neutral-800 px-2 py-0.5 rounded-md font-medium text-neutral-300">
                        {category.name}
                      </span>
                      <span className="flex items-center gap-0.5 text-neutral-400 group-hover:text-primary">
                        Ir para item <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categorias */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {normalizedQuery
                  ? `Categorias correspondentes (${filteredData.categories.length})`
                  : "Todas as Categorias"}
              </span>
              {!normalizedQuery && (
                <button
                  type="button"
                  onClick={handleViewAllTop}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Voltar ao topo
                </button>
              )}
            </div>

            {filteredData.categories.length === 0 && filteredData.matchingItems.length === 0 ? (
              <div className="py-12 text-center text-neutral-400">
                <p className="text-sm">
                  Nenhuma categoria ou item encontrado para &quot;{modalQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => setModalQuery("")}
                  className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
                >
                  Limpar pesquisa e ver todas
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {filteredData.categories.map((category) => {
                  const Icon = CATEGORY_ICONS[category.id] || UtensilsCrossed;
                  const isActive = activeCategoryId === category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryClick(category.id)}
                      className={`relative flex items-center gap-3 p-3 rounded-xl border text-left transition-all active:scale-[0.97] group ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-neutral-900/80 border-neutral-800/90 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-700"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? "bg-black/20 text-white"
                            : "bg-neutral-800 text-primary group-hover:bg-neutral-700 group-hover:text-primary-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-xs sm:text-sm truncate leading-snug">
                          {category.name}
                        </p>
                        <span
                          className={`text-[10px] mt-0.5 block ${
                            isActive ? "text-white/80" : "text-neutral-400"
                          }`}
                        >
                          {category.items.length} {category.items.length === 1 ? "item" : "itens"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="p-3 sm:p-4 border-t border-neutral-800/80 bg-neutral-900/80 flex items-center justify-between text-xs text-neutral-400 shrink-0">
          <span>Toque em qualquer categoria para navegar</span>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
