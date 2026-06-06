import { Zap } from 'lucide-react';
import type { PlugDevice } from '../../types';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Badge } from '../ui/Badge';

interface PlugCardProps {
  device: PlugDevice;
  onToggle: (id: string) => void;
}

export function PlugCard({ device, onToggle }: PlugCardProps) {
  const isDisabled = device.status === 'offline';

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${device.isOn ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <Zap size={18} className={device.isOn ? 'text-green-500' : 'text-gray-400'} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{device.name}</p>
            <Badge variant={device.status} label={device.status === 'online' ? 'Online' : 'Offline'} />
          </div>
        </div>
        <Toggle checked={device.isOn} onChange={() => onToggle(device.id)} disabled={isDisabled} size="sm" />
      </div>
      {device.isOn && (
        <div className="mt-3 flex items-center justify-end gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Zap size={12} className="text-green-500" />
          <span>{device.powerConsumption} W</span>
        </div>
      )}
    </Card>
  );
}
