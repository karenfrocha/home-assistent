import { Blinds } from 'lucide-react';
import type { BlindDevice } from '../../types';
import { Card } from '../ui/Card';
import { Slider } from '../ui/Slider';
import { Badge } from '../ui/Badge';

interface BlindCardProps {
  device: BlindDevice;
  onPositionChange: (id: string, value: number) => void;
}

export function BlindCard({ device, onPositionChange }: BlindCardProps) {
  const isDisabled = device.status === 'offline';

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800">
            <Blinds size={18} className="text-stone-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{device.name}</p>
            <Badge variant={device.status} label={device.status === 'online' ? 'Online' : 'Offline'} />
          </div>
        </div>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{device.position}%</span>
      </div>
      <Slider
        value={device.position}
        onChange={v => onPositionChange(device.id, v)}
        disabled={isDisabled}
        color="#78716c"
      />
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
        <span>Fechado</span>
        <span>Aberto</span>
      </div>
    </Card>
  );
}
