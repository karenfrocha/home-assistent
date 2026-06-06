import { X, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import type { Alert } from '../../types';
import { Card } from '../ui/Card';

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const ALERT_STYLES: Record<Alert['type'], { bg: string; icon: React.ReactNode }> = {
  warning: { bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', icon: <AlertTriangle size={14} className="text-amber-500 shrink-0" /> },
  info:    { bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',     icon: <Info size={14} className="text-blue-500 shrink-0" /> },
  danger:  { bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',         icon: <ShieldAlert size={14} className="text-red-500 shrink-0" /> },
};

export function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return (
      <Card>
        <p className="text-sm text-gray-400 text-center py-2">Nenhum alerta ativo</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Alertas</h3>
      <div className="space-y-2">
        {alerts.map(alert => {
          const style = ALERT_STYLES[alert.type];
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs ${style.bg}`}
            >
              {style.icon}
              <p className="flex-1 text-gray-700 dark:text-gray-300">{alert.message}</p>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-gray-400">{alert.timestamp}</span>
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Dispensar alerta"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
