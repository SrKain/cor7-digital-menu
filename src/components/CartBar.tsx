import { useState } from "react";
import { cartCount, cartTotal, useCartLines } from "../lib/cart-store";
import { formatPrice } from "../lib/format";
import { OrderSummaryDrawer } from "./OrderSummaryDrawer";

export function CartBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cart = useCartLines();
  const count = cartCount(cart);

  if (count === 0) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-xs">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:bg-primary/90 active:scale-98"
        >
          Ver pedido ({count} {count === 1 ? "item" : "itens"}) · {formatPrice(cartTotal(cart))}
        </button>
      </div>

      <OrderSummaryDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
}
