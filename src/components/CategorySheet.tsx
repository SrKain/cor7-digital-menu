import { LayoutGrid } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { categoryGroups, type MenuCategory } from "../data/menu";

type CategorySheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: readonly MenuCategory[];
  activeId: string;
  onSelectCategory: (id: string) => void;
};

export function CategorySheet({
  isOpen,
  onOpenChange,
  categories,
  activeId,
  onSelectCategory,
}: CategorySheetProps) {
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

  const handleSelect = (id: string) => {
    onOpenChange(false);
    window.setTimeout(() => {
      onSelectCategory(id);
    }, 50);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-border bg-background p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <SheetHeader className="text-left pb-2">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" aria-hidden="true" />
            <SheetTitle className="font-serif text-xl font-bold text-foreground">
              Todas as Categorias
            </SheetTitle>
          </div>
          <SheetDescription className="text-xs text-muted-foreground">
            Selecione uma seção para navegar rapidamente pelo cardápio
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {categoryGroups.map((group) => {
            const groupCategories = group.categoryIds
              .map((id) => categoryMap.get(id))
              .filter((cat): cat is MenuCategory => cat !== undefined);

            if (groupCategories.length === 0) return null;

            return (
              <div key={group.name} className="space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.name}
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {groupCategories.map((cat) => {
                    const isActive = cat.id === activeId;
                    const itemCount = cat.items.length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelect(cat.id)}
                        className={`flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-primary font-semibold text-primary-foreground shadow-xs"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span
                          className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs ${
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-background text-muted-foreground"
                          }`}
                        >
                          {itemCount} {itemCount === 1 ? "item" : "itens"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
