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
        aria-label={`Remover uma unidade de ${label}`}
        onClick={onDecrement}
        className="h-11 w-11 rounded-full text-lg font-semibold text-primary"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{quantity}</span>
      <button
        type="button"
        aria-label={`Adicionar uma unidade de ${label}`}
        onClick={onIncrement}
        className="h-11 w-11 rounded-full text-lg font-semibold text-primary"
      >
        +
      </button>
    </div>
  );
}
