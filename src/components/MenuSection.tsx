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
    <section id={`cat-${category.id}`} className="scroll-mt-32 px-4 pt-8">
      <h2 className="font-serif text-2xl">{category.name}</h2>
      {category.note ? (
        <p className="mt-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {category.note}
        </p>
      ) : null}
      <div className="mt-2">
        {items.map((item) => {
          const showGroup = item.group && item.group !== lastGroup;
          lastGroup = item.group;
          return (
            <div key={item.id}>
              {showGroup ? (
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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
