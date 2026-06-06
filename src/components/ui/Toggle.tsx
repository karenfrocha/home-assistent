interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function Toggle({ checked, onChange, disabled = false, size = 'md' }: ToggleProps) {
  const track = size === 'sm' ? 'w-9 h-5' : 'w-12 h-6';
  const thumb = size === 'sm' ? 'w-4 h-4 top-0.5' : 'w-5 h-5 top-0.5';
  const translate = size === 'sm' ? 'translate-x-4' : 'translate-x-6';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={[
        'relative inline-flex shrink-0 rounded-full transition-colors duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        track,
        checked ? 'bg-blue-500' : 'bg-gray-300',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      <span
        className={[
          'absolute left-0.5 rounded-full bg-white shadow transition-transform duration-200',
          thumb,
          checked ? translate : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}
