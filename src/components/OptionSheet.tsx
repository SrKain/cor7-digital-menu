import { useState } from "react";

type OptionSheetProps = {
  title: string;
  options: readonly string[];
  onConfirm: (option: string) => void;
  onClose: () => void;
};

export function OptionSheet({ title, options, onConfirm, onClose }: OptionSheetProps) {
  const [selected, setSelected] = useState<string>(options[0] ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-foreground/60" onClick={onClose}>
      <div
        role="dialog"
        aria-label={`Escolha uma opção para ${title}`}
        className="w-full rounded-t-2xl bg-background p-5 pb-8"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-serif text-xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Escolha uma opção</p>
        <div className="mt-4 flex flex-col gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              aria-pressed={selected === option}
              className={`min-h-11 rounded-xl border px-4 text-left text-sm ${
                selected === option
                  ? "border-primary font-semibold text-primary"
                  : "border-border text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 rounded-xl border border-border text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(selected)}
            className="min-h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
