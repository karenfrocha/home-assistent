interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  color?: string;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  color = '#3b82f6',
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={e => onChange(Number(e.target.value))}
      style={{ '--slider-color': color, '--slider-pct': `${pct}%` } as React.CSSProperties}
      className={[
        'w-full h-1.5 rounded-full appearance-none cursor-pointer',
        'bg-[linear-gradient(to_right,var(--slider-color)_var(--slider-pct),#e5e7eb_var(--slider-pct))]',
        '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4',
        '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full',
        '[&::-webkit-slider-thumb]:bg-[var(--slider-color)] [&::-webkit-slider-thumb]:shadow-sm',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
    />
  );
}
