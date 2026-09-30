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
    <div className="inline-flex items-center gap-1 rounded-full border border-primary bg-background">
      <button
        type="button"
        aria-label={`Remover uma unidade de ${label}`}
        onClick={onDecrement}
        className="flex h-11 w-11 min-h-11 min-w-[44px] items-center justify-center rounded-full text-lg font-semibold text-primary transition-transform active:scale-95"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums text-foreground">
        {quantity}
      </span>
      <button
        type="button"
        aria-label={`Adicionar uma unidade de ${label}`}
        onClick={onIncrement}
        className="flex h-11 w-11 min-h-11 min-w-[44px] items-center justify-center rounded-full text-lg font-semibold text-primary transition-transform active:scale-95"
      >
        +
      </button>
    </div>
  );
}
