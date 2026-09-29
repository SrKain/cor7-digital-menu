import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pedido")({
  component: PedidoRoute,
});

function PedidoRoute() {
  return null;
}
