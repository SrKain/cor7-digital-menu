type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  label: string;
};

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  label,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-primary">
      <button
        type="button"
        aria-label={`Diminuir quantidade de ${label}`}
        onClick={onDecrement}
        className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full text-lg font-semibold text-primary transition-colors hover:bg-primary/10 active:scale-95"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{quantity}</span>
      <button
        type="button"
        aria-label={`Aumentar quantidade de ${label}`}
        onClick={onIncrement}
        className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full text-lg font-semibold text-primary transition-colors hover:bg-primary/10 active:scale-95"
      >
        +
      </button>
    </div>
  );
}
