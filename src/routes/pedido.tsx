import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Trash2, MessageSquareText, ExternalLink } from "lucide-react";
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
import { QuantityStepper } from "../components/QuantityStepper";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/pedido")({
  head: () => ({
    meta: [{ title: "Seu pedido · Cor7" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PedidoPage,
});

function OrderLineRow({ line }: { line: CartLine }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border py-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-foreground break-words">
          {line.name}
        </p>
        {line.option ? (
          <p className="mt-0.5 text-xs text-muted-foreground">Opção: {line.option}</p>
        ) : null}
        <p className="mt-1 text-xs text-muted-foreground">
          {formatPrice(line.price)} un. ·{" "}
          <span className="font-semibold text-foreground">
            Subtotal: {formatPrice(line.price * line.quantity)}
          </span>
        </p>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1.5 pt-0.5">
        <QuantityStepper
          quantity={line.quantity}
          onIncrement={() => incrementLine(line.key)}
          onDecrement={() => decrementLine(line.key)}
          label={line.option ? `${line.name} (${line.option})` : line.name}
        />
        <button
          type="button"
          onClick={() => removeLine(line.key)}
          aria-label={`Remover ${line.name} do pedido`}
          className="flex h-11 w-11 min-h-11 min-w-[44px] shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive active:scale-95"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

type OrderDetailsFormProps = {
  details: OrderDetails;
  onChange: (details: OrderDetails) => void;
};

function OrderDetailsForm({ details, onChange }: OrderDetailsFormProps) {
  return (
    <div className="mt-6 space-y-4 rounded-2xl border border-border bg-secondary/30 p-4">
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        Informações adicionais (opcional)
      </h3>

      <div>
        <label htmlFor="customer-name" className="block text-xs font-medium text-foreground">
          Seu nome
        </label>
        <input
          id="customer-name"
          type="text"
          maxLength={60}
          value={details.name}
          onChange={(event) => onChange({ ...details, name: event.target.value })}
          placeholder="Ex.: Carlos Santos"
          className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-xs font-medium text-foreground">
          Observações gerais
        </label>
        <textarea
          id="notes"
          maxLength={300}
          value={details.notes}
          onChange={(event) => onChange({ ...details, notes: event.target.value })}
          placeholder="Ex.: sem cebola, ponto da carne bem passado, sem gelo..."
          rows={3}
          className="mt-1.5 w-full rounded-xl border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <p className="mt-1 text-right text-[10px] text-muted-foreground">
          {details.notes.length}/300 caracteres
        </p>
      </div>
    </div>
  );
}

type OrderPreviewProps = {
  cart: readonly CartLine[];
  details: OrderDetails;
  onEdit: () => void;
  onReset: () => void;
};

function OrderPreview({ cart, details, onEdit, onReset }: OrderPreviewProps) {
  const message = buildOrderMessage(cart, details);
  const whatsappUrl = buildWhatsAppUrl(message);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
        <div className="flex items-center gap-2 pb-3 text-sm font-semibold text-foreground">
          <MessageSquareText className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Mensagem formatada para WhatsApp</span>
        </div>
        <pre className="whitespace-pre-wrap rounded-xl border border-border bg-secondary/60 p-4 font-sans text-xs leading-relaxed text-foreground sm:text-sm">
          {message}
        </pre>
      </div>

      <div className="space-y-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 active:scale-98"
        >
          <span>Pedir pelo WhatsApp</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={onEdit}
          className="flex min-h-12 w-full items-center justify-center rounded-full border border-input bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary active:scale-98"
        >
          Editar pedido
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex min-h-11 w-full items-center justify-center rounded-full text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
        >
          Começar novo pedido
        </button>
      </div>
    </div>
  );
}

function PedidoPage() {
  const navigate = useNavigate();
  const cart = useCartLines();
  const count = cartCount(cart);
  const total = cartTotal(cart);

  const [step, setStep] = useState<"conferencia" | "previa">("conferencia");
  const [details, setDetails] = useState<OrderDetails>({
    notes: "",
    name: "",
  });

  const handleResetAll = () => {
    clearCart();
    setDetails({ notes: "", name: "" });
    navigate({ to: "/" });
  };

  if (count === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-background text-foreground antialiased">
        <header className="border-b border-border bg-background px-4 py-4">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao cardápio</span>
          </Link>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Seu pedido está vazio
          </h1>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Adicione itens saborosos do cardápio antes de finalizar o seu pedido.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            Ver cardápio
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-xs">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Cardápio</span>
          </Link>
          <h1 className="font-serif text-lg font-bold text-foreground">
            {step === "conferencia" ? "Conferir Pedido" : "Prévia do WhatsApp"}
          </h1>
          <div className="w-16" aria-hidden="true" />
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        {step === "conferencia" ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Itens selecionados ({count})
                </h2>
                <button
                  type="button"
                  onClick={() => clearCart()}
                  className="text-xs font-medium text-destructive hover:underline"
                >
                  Limpar tudo
                </button>
              </div>

              <div className="divide-y divide-border/60">
                {cart.map((line) => (
                  <OrderLineRow key={line.key} line={line} />
                ))}
              </div>
            </div>

            <OrderDetailsForm details={details} onChange={setDetails} />

            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total do pedido</span>
                <span className="font-serif text-xl font-bold text-foreground">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("previa")}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 active:scale-98"
              >
                Confirmar pedido ({formatPrice(total)})
              </button>

              <Link
                to="/"
                className="flex min-h-12 w-full items-center justify-center rounded-full border border-input bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary active:scale-98"
              >
                Voltar ao cardápio
              </Link>
            </div>
          </div>
        ) : (
          <OrderPreview
            cart={cart}
            details={details}
            onEdit={() => setStep("conferencia")}
            onReset={handleResetAll}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
