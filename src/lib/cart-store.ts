import { useSyncExternalStore } from "react";
import type { MenuItem } from "../data/menu";

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  price: number;
  option?: string | undefined;
  quantity: number;
};

type Listener = () => void;

const listeners = new Set<Listener>();
let lines: readonly CartLine[] = [];

const EMPTY: readonly CartLine[] = [];

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function lineKey(itemId: string, option?: string) {
  return option ? `${itemId}__${option}` : itemId;
}

export function addLine(item: MenuItem, option?: string) {
  const key = lineKey(item.id, option);
  const existing = lines.find((line) => line.key === key);
  lines = existing
    ? lines.map((line) => (line.key === key ? { ...line, quantity: line.quantity + 1 } : line))
    : [...lines, { key, itemId: item.id, name: item.name, price: item.price, option, quantity: 1 }];
  emit();
}

export function decrementLine(key: string) {
  lines = lines
    .map((line) => (line.key === key ? { ...line, quantity: line.quantity - 1 } : line))
    .filter((line) => line.quantity > 0);
  emit();
}

export function incrementLine(key: string) {
  lines = lines.map((line) => (line.key === key ? { ...line, quantity: line.quantity + 1 } : line));
  emit();
}

export function removeLine(key: string) {
  lines = lines.filter((line) => line.key !== key);
  emit();
}

export function clearCart() {
  lines = [];
  emit();
}

export function useCartLines(): readonly CartLine[] {
  return useSyncExternalStore(
    subscribe,
    () => lines,
    () => EMPTY,
  );
}

export function useItemQuantity(itemId: string): number {
  const cart = useCartLines();
  return cart
    .filter((line) => line.itemId === itemId)
    .reduce((sum, line) => sum + line.quantity, 0);
}

export function cartCount(cart: readonly CartLine[]): number {
  return cart.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartTotal(cart: readonly CartLine[]): number {
  return cart.reduce((sum, line) => sum + line.quantity * line.price, 0);
}
