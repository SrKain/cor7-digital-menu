import { Link } from "@tanstack/react-router";
import { cartCount, cartTotal, useCartLines } from "../lib/cart-store";
import { formatPrice } from "../lib/format";

export function CartBar() {
  const cart = useCartLines();
  const count = cartCount(cart);
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-3">
      <Link
        to="/pedido"
        className="flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
      >
        Ver pedido ({count} {count === 1 ? "item" : "itens"}) · {formatPrice(cartTotal(cart))}
      </Link>
    </div>
  );
}
