import { Camera, AlertTriangle } from 'lucide-react';
import type { CameraDevice } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface CameraCardProps {
  device: CameraDevice;
}

export function CameraCard({ device }: CameraCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${device.isOn ? 'bg-slate-100 dark:bg-slate-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <Camera size={18} className={device.isOn ? 'text-slate-600' : 'text-gray-400'} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{device.name}</p>
            <Badge variant={device.status} label={device.status === 'online' ? 'Online' : 'Offline'} />
          </div>
        </div>
        {device.recording && (
          <span className="flex items-center gap-1 text-xs font-medium text-red-600">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            REC
          </span>
        )}
      </div>
      {device.motionDetected && (
        <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle size={14} />
          Movimento detectado
        </div>
      )}
    </Card>
  );
}
