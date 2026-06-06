import { Thermometer, Droplets, ChevronUp, ChevronDown } from 'lucide-react';
import type { ThermostatDevice } from '../../types';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Badge } from '../ui/Badge';

interface ThermostatCardProps {
  device: ThermostatDevice;
  onToggle: (id: string) => void;
  onTargetTempChange: (id: string, value: number) => void;
}

const MODE_LABELS: Record<ThermostatDevice['mode'], string> = {
  heat: 'Aquecimento',
  cool: 'Resfriamento',
  auto: 'Automático',
  off: 'Desligado',
};

export function ThermostatCard({ device, onToggle, onTargetTempChange }: ThermostatCardProps) {
  const isDisabled = device.status === 'offline';

  return (
    <Card className={device.isOn ? 'ring-1 ring-blue-200' : ''}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${device.isOn ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <Thermometer size={18} className={device.isOn ? 'text-blue-500' : 'text-gray-400'} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{device.name}</p>
            <Badge variant={device.status} label={device.status === 'online' ? 'Online' : 'Offline'} />
          </div>
        </div>
        <Toggle checked={device.isOn} onChange={() => onToggle(device.id)} disabled={isDisabled} size="sm" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{device.currentTemp}°</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Temperatura atual</p>
        </div>

        {device.isOn && (
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => onTargetTempChange(device.id, Math.min(30, device.targetTemp + 0.5))}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <ChevronUp size={16} />
            </button>
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">{device.targetTemp}°</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Meta</p>
            </div>
            <button
              onClick={() => onTargetTempChange(device.id, Math.max(16, device.targetTemp - 0.5))}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>

      {device.isOn && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
            {MODE_LABELS[device.mode]}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Droplets size={12} />
            {device.humidity}%
          </span>
        </div>
      )}
    </Card>
  );
}
