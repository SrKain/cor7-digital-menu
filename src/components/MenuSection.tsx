import type { MenuCategory, MenuItem } from "../data/menu";
import { MenuItemCard } from "./MenuItemCard";

export function MenuSection({
  category,
  items,
}: {
  category: MenuCategory;
  items: readonly MenuItem[];
}) {
  if (items.length === 0) return null;

  let lastGroup: string | undefined;

  return (
    <section id={`cat-${category.id}`} className="scroll-mt-24 px-4 pt-8 pb-2">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          {category.name}
        </h2>
        {category.note ? (
          <span className="inline-block rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {category.note}
          </span>
        ) : null}
      </div>
      <div className="mt-1">
        {items.map((item) => {
          const showGroup = item.group && item.group !== lastGroup;
          lastGroup = item.group;
          return (
            <div key={item.id}>
              {showGroup ? (
                <p className="pt-5 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.group}
                </p>
              ) : null}
              <MenuItemCard item={item} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
