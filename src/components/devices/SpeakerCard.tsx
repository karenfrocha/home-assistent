import { Speaker, Music, Volume2 } from 'lucide-react';
import type { SpeakerDevice } from '../../types';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Slider } from '../ui/Slider';
import { Badge } from '../ui/Badge';

interface SpeakerCardProps {
  device: SpeakerDevice;
  onToggle: (id: string) => void;
  onVolumeChange: (id: string, value: number) => void;
}

export function SpeakerCard({ device, onToggle, onVolumeChange }: SpeakerCardProps) {
  const isDisabled = device.status === 'offline';

  return (
    <Card className={device.isOn ? 'ring-1 ring-purple-200' : ''}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${device.isOn ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <Speaker size={18} className={device.isOn ? 'text-purple-500' : 'text-gray-400'} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{device.name}</p>
            <Badge variant={device.status} label={device.status === 'online' ? 'Online' : 'Offline'} />
          </div>
        </div>
        <Toggle checked={device.isOn} onChange={() => onToggle(device.id)} disabled={isDisabled} size="sm" />
      </div>

      {device.isOn && device.currentTrack && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Music size={12} className="text-purple-500 shrink-0" />
          <p className="text-xs text-purple-700 dark:text-purple-300 truncate">{device.currentTrack}</p>
        </div>
      )}

      {device.isOn && (
        <div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <Volume2 size={12} className="inline" />
            <span>{device.volume}%</span>
          </div>
          <Slider
            value={device.volume}
            onChange={v => onVolumeChange(device.id, v)}
            disabled={isDisabled}
            color="#a855f7"
          />
        </div>
      )}
    </Card>
  );
}
