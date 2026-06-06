import { Lock, Unlock, Clock } from 'lucide-react';
import type { LockDevice } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface LockCardProps {
  device: LockDevice;
  onToggleLock: (id: string) => void;
}

export function LockCard({ device, onToggleLock }: LockCardProps) {
  const isDisabled = device.status === 'offline';

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${device.isLocked ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
            {device.isLocked ? (
              <Lock size={18} className="text-emerald-600" />
            ) : (
              <Unlock size={18} className="text-amber-500" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{device.name}</p>
            <Badge variant={device.status} label={device.status === 'online' ? 'Online' : 'Offline'} />
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            device.isLocked ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
          }`}
        >
          {device.isLocked ? 'Travado' : 'Destravado'}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <Clock size={12} />
          Última atividade: {device.lastActivity}
        </span>
        <button
          onClick={() => onToggleLock(device.id)}
          disabled={isDisabled}
          className={[
            'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
            device.isLocked
              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50'
              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
            isDisabled ? 'opacity-50 cursor-not-allowed' : '',
          ].join(' ')}
        >
          {device.isLocked ? 'Destravar' : 'Travar'}
        </button>
      </div>
    </Card>
  );
}
