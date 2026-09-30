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

const STORAGE_KEY = "@cor7:cart";

type Listener = () => void;

const listeners = new Set<Listener>();

function isValidCartLine(item: unknown): item is CartLine {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Partial<CartLine>;
  return (
    typeof candidate.key === "string" &&
    typeof candidate.itemId === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.price === "number" &&
    !Number.isNaN(candidate.price) &&
    typeof candidate.quantity === "number" &&
    candidate.quantity > 0 &&
    (candidate.option === undefined || typeof candidate.option === "string")
  );
}

function loadInitialLines(): readonly CartLine[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isValidCartLine)) {
      return parsed;
    }
  } catch (error) {
    console.warn(
      "[cart-store] Falha ao carregar do localStorage. Usando fallback em memória:",
      error,
    );
  }
  return [];
}

function saveLines(data: readonly CartLine[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("[cart-store] Falha ao persistir no localStorage:", error);
  }
}

let lines: readonly CartLine[] = loadInitialLines();

const EMPTY: readonly CartLine[] = [];

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      lines = loadInitialLines();
      emit();
    }
  });
}

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
  saveLines(lines);
  emit();
}

export function decrementLine(key: string) {
  lines = lines
    .map((line) => (line.key === key ? { ...line, quantity: line.quantity - 1 } : line))
    .filter((line) => line.quantity > 0);
  saveLines(lines);
  emit();
}

export function incrementLine(key: string) {
  lines = lines.map((line) => (line.key === key ? { ...line, quantity: line.quantity + 1 } : line));
  saveLines(lines);
  emit();
}

export function removeLine(key: string) {
  lines = lines.filter((line) => line.key !== key);
  saveLines(lines);
  emit();
}

export function clearCart() {
  lines = [];
  saveLines(lines);
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
