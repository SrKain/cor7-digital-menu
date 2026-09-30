import { config } from "../config";
import { formatPrice } from "./format";
import { cartTotal, type CartLine } from "./cart-store";

export type OrderDetails = {
  notes: string;
  name: string;
};

export function buildOrderMessage(cart: readonly CartLine[], details: OrderDetails): string {
  const blocks: string[] = ["Olá! Gostaria de fazer um pedido:"];

  const items = cart.map((line) => {
    const label = line.option ? `${line.name} (${line.option})` : line.name;
    return `${line.quantity}x ${label} - ${formatPrice(line.quantity * line.price)}`;
  });
  blocks.push(items.join("\n"));

  const info: string[] = [];
  const notes = details.notes.trim();
  if (notes) info.push(`Observações: ${notes}`);

  const name = details.name.trim();
  if (name) info.push(`Nome: ${name}`);

  if (info.length > 0) blocks.push(info.join("\n"));

  blocks.push(`Total: ${formatPrice(cartTotal(cart))}`);

  return blocks.join("\n\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `${config.whatsappBaseUrl}${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
