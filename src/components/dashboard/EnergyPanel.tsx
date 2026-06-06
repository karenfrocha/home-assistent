import type { EnergyUsage } from '../../types';
import { Card } from '../ui/Card';
import { Zap } from 'lucide-react';

interface EnergyPanelProps {
  usage: EnergyUsage[];
}

const BAR_COLORS = [
  'bg-blue-500',
  'bg-yellow-400',
  'bg-emerald-500',
  'bg-purple-500',
];

export function EnergyPanel({ usage }: EnergyPanelProps) {
  const total = usage.reduce((sum, u) => sum + u.value, 0);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <Zap size={15} className="text-yellow-500" />
          Consumo de Energia
        </h3>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{total.toFixed(1)} kWh hoje</span>
      </div>

      <div className="space-y-3">
        {usage.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>{item.label}</span>
              <span>{item.value} kWh</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
