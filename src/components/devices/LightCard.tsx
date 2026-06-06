import { Sun, Thermometer } from 'lucide-react';
import type { LightDevice } from '../../types';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Slider } from '../ui/Slider';
import { Badge } from '../ui/Badge';

interface LightCardProps {
  device: LightDevice;
  onToggle: (id: string) => void;
  onBrightnessChange: (id: string, value: number) => void;
  onColorTempChange: (id: string, value: number) => void;
}

export function LightCard({
  device,
  onToggle,
  onBrightnessChange,
  onColorTempChange,
}: LightCardProps) {
  const isDisabled = device.status === 'offline';

  return (
    <Card className={device.isOn ? 'ring-1 ring-yellow-300' : ''}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-xl ${device.isOn ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            <Sun
              size={18}
              className={device.isOn ? 'text-yellow-500' : 'text-gray-400'}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{device.name}</p>
            <Badge variant={device.status} label={device.status === 'online' ? 'Online' : 'Offline'} />
          </div>
        </div>
        <Toggle
          checked={device.isOn}
          onChange={() => onToggle(device.id)}
          disabled={isDisabled}
          size="sm"
        />
      </div>

      {device.isOn && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Brilho</span>
              <span>{device.brightness}%</span>
            </div>
            <Slider
              value={device.brightness}
              onChange={v => onBrightnessChange(device.id, v)}
              disabled={isDisabled}
              color="#eab308"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <Thermometer size={12} className="inline mr-1" />
              <span>Temperatura de cor</span>
              <span>{device.colorTemp}K</span>
            </div>
            <Slider
              value={device.colorTemp}
              min={2700}
              max={6500}
              step={100}
              onChange={v => onColorTempChange(device.id, v)}
              disabled={isDisabled}
              color="#a78bfa"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
