import { config } from "../config";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground">
      {config.legalNotice}
    </footer>
  );
}
