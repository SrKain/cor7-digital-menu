import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { config } from "../config";
import { formatPrice } from "../lib/format";
import {
  cartTotal,
  decrementLine,
  incrementLine,
  removeLine,
  useCartLines,
} from "../lib/cart-store";
import { buildOrderMessage, buildWhatsAppUrl } from "../lib/order";
import { QuantityStepper } from "../components/QuantityStepper";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/pedido")({
  head: () => ({
    meta: [
      { title: "Conferir pedido — Cor7" },
      {
        name: "description",
        content: "Confira os itens do seu pedido no Cor7 e envie a mensagem pelo WhatsApp.",
      },
      { property: "og:title", content: "Conferir pedido — Cor7" },
      {
        property: "og:description",
        content: "Revise seu pedido no Cor7 antes de enviar pelo WhatsApp.",
      },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const cart = useCartLines();
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const message = buildOrderMessage(cart, { notes, name, table });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background px-4 py-3">
        <h1 className="font-serif text-2xl">Seu pedido</h1>
      </header>

      <main className="px-4 pb-10">
        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">Seu pedido está vazio.</p>
            <Link
              to="/"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              Voltar ao cardápio
            </Link>
          </div>
        ) : (
          <>
            <ul>
              {cart.map((line) => (
                <li key={line.key} className="border-b border-border py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-base">{line.name}</p>
                      {line.option ? (
                        <p className="text-sm text-muted-foreground">{line.option}</p>
                      ) : null}
                      <p className="mt-1 text-sm font-semibold">
                        {formatPrice(line.price * line.quantity)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <QuantityStepper
                        quantity={line.quantity}
                        onIncrement={() => incrementLine(line.key)}
                        onDecrement={() => decrementLine(line.key)}
                        label={line.name}
                      />
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        className="text-xs text-muted-foreground underline"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <label className="text-sm">
                Observações (opcional)
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Ex.: sem cebola"
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-border p-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="text-sm">
                Nome (opcional)
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="text-sm">
                Mesa (opcional)
                <input
                  value={table}
                  onChange={(event) => setTable(event.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-primary"
                />
              </label>
            </div>

            <p className="mt-6 text-right font-serif text-xl">
              Total: {formatPrice(cartTotal(cart))}
            </p>

            {confirmed ? (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Prévia da mensagem:</p>
                <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-border p-3 text-sm">
                  {message}
                </pre>
                <a
                  href={buildWhatsAppUrl(message)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                >
                  Pedir pelo WhatsApp
                </a>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                Confirmar pedido
              </button>
            )}

            <Link
              to="/"
              className="mt-3 flex min-h-12 items-center justify-center rounded-full border border-border px-5 text-sm font-medium"
            >
              Voltar ao cardápio
            </Link>

            <p className="mt-6 text-center text-xs text-muted-foreground">{config.legalNotice}</p>
          </>
        )}
      </main>

      {cart.length === 0 ? <Footer /> : null}
    </div>
  );
}
