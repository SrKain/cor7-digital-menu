import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Trash2, MessageSquareText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import {
  useCartLines,
  cartTotal,
  cartCount,
  incrementLine,
  decrementLine,
  removeLine,
  clearCart,
  type CartLine,
} from "../lib/cart-store";
import { formatPrice } from "../lib/format";
import { buildOrderMessage, buildWhatsAppUrl, type OrderDetails } from "../lib/order";
import { QuantityStepper } from "./QuantityStepper";

type OrderSummaryDrawerProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OrderSummaryDrawer({ isOpen, onOpenChange }: OrderSummaryDrawerProps) {
  const cart = useCartLines();
  const count = cartCount(cart);
  const total = cartTotal(cart);

  const [details, setDetails] = useState<OrderDetails>({
    notes: "",
    name: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  const orderMessage = buildOrderMessage(cart, details);
  const whatsappUrl = buildWhatsAppUrl(orderMessage);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto flex max-h-[90vh] w-full max-w-lg flex-col rounded-t-3xl border-t border-border bg-background p-0 shadow-2xl focus:outline-none"
      >
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <div className="flex items-center justify-between pr-8">
            <div>
              <SheetTitle className="font-serif text-xl font-bold tracking-tight text-foreground">
                Resumo do Pedido
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                {count === 0
                  ? "Nenhum item selecionado"
                  : `${count} ${count === 1 ? "item selecionado" : "itens selecionados"}`}
              </SheetDescription>
            </div>
            {count > 0 ? (
              <button
                type="button"
                onClick={() => clearCart()}
                className="text-xs font-medium text-destructive transition-colors hover:underline"
              >
                Limpar tudo
              </button>
            ) : null}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 no-scrollbar">
          {count === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-lg font-semibold text-foreground">
                Seu pedido está vazio
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Escolha itens do cardápio para adicioná-los ao seu pedido.
              </p>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-6 text-sm font-semibold text-foreground hover:bg-secondary/80"
              >
                Explorar cardápio
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Items list */}
              <div className="divide-y divide-border/60">
                {cart.map((line: CartLine) => (
                  <div key={line.key} className="flex items-start justify-between gap-3 py-3.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{line.name}</p>
                        <button
                          type="button"
                          onClick={() => removeLine(line.key)}
                          aria-label={`Remover ${line.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {line.option ? (
                        <p className="text-xs text-muted-foreground">Opção: {line.option}</p>
                      ) : null}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatPrice(line.price)} un. ·{" "}
                        <span className="font-semibold text-foreground">
                          {formatPrice(line.price * line.quantity)}
                        </span>
                      </p>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      <QuantityStepper
                        quantity={line.quantity}
                        onIncrement={() => incrementLine(line.key)}
                        onDecrement={() => decrementLine(line.key)}
                        label={line.option ? `${line.name} (${line.option})` : line.name}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Identification and notes */}
              <div className="space-y-3 rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Identificação & Observações (opcional)
                </p>

                <div>
                  <label
                    htmlFor="drawer-name"
                    className="block text-xs font-medium text-foreground"
                  >
                    Seu nome
                  </label>
                  <input
                    id="drawer-name"
                    type="text"
                    maxLength={60}
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    placeholder="Ex.: Carlos"
                    className="mt-1 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="drawer-notes"
                    className="block text-xs font-medium text-foreground"
                  >
                    Observações do pedido
                  </label>
                  <textarea
                    id="drawer-notes"
                    maxLength={150}
                    value={details.notes}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    placeholder="Ex.: sem gelo, ponto da carne, sem cebola..."
                    rows={2}
                    className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Message preview accordion */}
              <div className="rounded-2xl border border-border bg-card p-3.5">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex w-full items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquareText className="h-3.5 w-3.5 text-primary" />
                    <span>Ver mensagem formatada do WhatsApp</span>
                  </span>
                  {showPreview ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {showPreview ? (
                  <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-border bg-secondary/50 p-3 font-sans text-xs leading-relaxed text-foreground">
                    {orderMessage}
                  </pre>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {count > 0 ? (
          <div className="border-t border-border bg-background p-4 shadow-lg">
            {/* Total price highlight */}
            <div className="mb-3 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total do Pedido
              </span>
              <span className="font-serif text-xl font-bold tracking-tight text-foreground">
                {formatPrice(total)}
              </span>
            </div>

            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 active:scale-98"
              >
                <span>Finalizar via WhatsApp</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>

              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  Continuar escolhendo
                </button>

                <Link
                  to="/pedido"
                  onClick={() => onOpenChange(false)}
                  className="font-medium text-primary hover:underline"
                >
                  Abrir tela completa
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
