import type { ReactNode } from "react";

export const authFieldClasses =
  "w-full rounded-lg border border-white/10 bg-surface-2/60 px-3 py-2 text-base text-on-surface outline-none transition-colors focus:border-accent-cyan/50 placeholder-on-surface-variant/40";

export const authLabelClasses =
  "font-label-mono text-xs uppercase tracking-wider text-on-surface-variant";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="glass-panel rounded-2xl p-8 shadow-2xl">
      <div className="mb-6 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-on-surface">{title}</h1>
        <p className="mt-1 text-base text-on-surface-variant">{subtitle}</p>
      </div>

      {children}

      {footer && (
        <div className="mt-6 text-center text-sm text-on-surface-variant">
          {footer}
        </div>
      )}
    </div>
  );
}
