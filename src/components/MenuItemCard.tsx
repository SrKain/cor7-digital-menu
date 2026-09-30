import { useState } from "react";
import type { MenuItem } from "../data/menu";
import { formatPrice } from "../lib/format";
import { addLine, decrementLine, useCartLines } from "../lib/cart-store";
import { QuantityStepper } from "./QuantityStepper";
import { OptionSheet } from "./OptionSheet";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const cart = useCartLines();
  const lines = cart.filter((line) => line.itemId === item.id);
  const quantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  const hasOptions = Boolean(item.options?.length);

  function increment() {
    if (hasOptions) setSheetOpen(true);
    else addLine(item);
  }

  function decrement() {
    const last = lines[lines.length - 1];
    if (last) decrementLine(last.key);
  }

  return (
    <article className="border-b border-border py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base leading-snug">{item.name}</h3>
          {item.description ? (
            <p className="mt-1 text-sm leading-snug text-muted-foreground">{item.description}</p>
          ) : null}
          {item.note ? (
            <span className="mt-2 inline-block rounded-full border border-primary px-2.5 py-0.5 text-[11px] font-medium text-primary">
              {item.note}
            </span>
          ) : null}
          <p className="mt-2 text-sm font-semibold text-foreground">{formatPrice(item.price)}</p>
        </div>
        <div className="shrink-0 pt-0.5">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={increment}
              aria-label={`Adicionar ${item.name} ao pedido`}
              className="flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
            >
              Adicionar
            </button>
          ) : (
            <QuantityStepper
              quantity={quantity}
              onIncrement={increment}
              onDecrement={decrement}
              label={item.name}
            />
          )}
        </div>
      </div>

      {sheetOpen && item.options ? (
        <OptionSheet
          title={item.name}
          options={item.options}
          onClose={() => setSheetOpen(false)}
          onConfirm={(option) => {
            addLine(item, option);
            setSheetOpen(false);
          }}
        />
      ) : null}
    </article>
  );
}
