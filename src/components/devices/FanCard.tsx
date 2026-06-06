import { Wind } from 'lucide-react';
import type { FanDevice } from '../../types';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Badge } from '../ui/Badge';

interface FanCardProps {
  device: FanDevice;
  onToggle: (id: string) => void;
  onSpeedChange: (id: string, speed: FanDevice['speed']) => void;
}

const SPEEDS: Array<{ value: FanDevice['speed']; label: string }> = [
  { value: 1, label: 'Baixo' },
  { value: 2, label: 'Médio' },
  { value: 3, label: 'Alto' },
  { value: 4, label: 'Turbo' },
];

export function FanCard({ device, onToggle, onSpeedChange }: FanCardProps) {
  const isDisabled = device.status === 'offline';

  return (
    <Card className={device.isOn ? 'ring-1 ring-cyan-200' : ''}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${device.isOn ? 'bg-cyan-100 dark:bg-cyan-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <Wind size={18} className={device.isOn ? 'text-cyan-500' : 'text-gray-400'} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{device.name}</p>
            <Badge variant={device.status} label={device.status === 'online' ? 'Online' : 'Offline'} />
          </div>
        </div>
        <Toggle checked={device.isOn} onChange={() => onToggle(device.id)} disabled={isDisabled} size="sm" />
      </div>

      {device.isOn && (
        <div className="flex gap-1 mt-2">
          {SPEEDS.map(s => (
            <button
              key={s.value}
              onClick={() => onSpeedChange(device.id, s.value)}
              className={[
                'flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors',
                device.speed === s.value
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600',
              ].join(' ')}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
