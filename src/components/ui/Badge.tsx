type BadgeVariant = 'online' | 'offline' | 'error' | 'warning' | 'info' | 'danger';

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  online: 'bg-emerald-100 text-emerald-700',
  offline: 'bg-gray-100 text-gray-500',
  error: 'bg-red-100 text-red-600',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-blue-100 text-blue-700',
  danger: 'bg-red-100 text-red-700',
};

export function Badge({ variant, label }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${VARIANT_STYLES[variant]}`}
    >
      {variant === 'online' && (
        <span className="mr-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      )}
      {label}
    </span>
  );
}
