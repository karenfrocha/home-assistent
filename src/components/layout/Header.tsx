import { Bell, Wifi, Home, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  alertCount: number;
  devicesOnline: number;
  totalDevices: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ alertCount, devicesOnline, totalDevices, theme, onToggleTheme }: HeaderProps) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-xl">
          <Home size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Casa Inteligente</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{dateStr}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Wifi size={15} className="text-emerald-500" />
          <span>
            {devicesOnline}/{totalDevices} dispositivos
          </span>
        </div>

        <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">{timeStr}</div>

        <button
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {alertCount > 0 && (
          <div className="relative">
            <Bell size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {alertCount}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
