const toneClasses = {
  amber: "bg-amber-400/12 text-amber-200 border-amber-300/30",
  blue: "bg-sky-400/12 text-sky-200 border-sky-300/30",
  green: "bg-emerald-400/12 text-emerald-200 border-emerald-300/30",
  neutral: "bg-secondary text-secondary-foreground border-border",
  red: "bg-red-400/12 text-red-200 border-red-300/30",
};

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <span
      className={`inline-flex min-h-6 items-center rounded-full border px-2 py-1 text-xs font-medium capitalize ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
