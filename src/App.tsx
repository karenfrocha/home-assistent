import { useMemo, useState } from 'react';
import { Power, WifiOff, Zap } from 'lucide-react';

import { useHomeState } from './hooks/useHomeState';
import { useTheme } from './hooks/useTheme';

import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

import { StatCard } from './components/dashboard/StatCard';
import { WeatherWidget } from './components/dashboard/WeatherWidget';
import { EnergyPanel } from './components/dashboard/EnergyPanel';
import { AlertsPanel } from './components/dashboard/AlertsPanel';
import { DeviceGrid } from './components/dashboard/DeviceGrid';
import { RoomTabs } from './components/dashboard/RoomTabs';

export default function App() {
  const {
    rooms,
    devices,
    weather,
    energyUsage,
    alerts,
    stats,
    toggleDevice,
    updateDevice,
    dismissAlert,
  } = useHomeState();

  const { theme, toggleTheme } = useTheme();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const filteredDevices = useMemo(
    () => (selectedRoomId ? devices.filter(d => d.roomId === selectedRoomId) : devices),
    [devices, selectedRoomId],
  );

  const deviceCountByRoom = useMemo(
    () =>
      rooms.reduce<Record<string, number>>((acc, room) => {
        acc[room.id] = devices.filter(d => d.roomId === room.id).length;
        return acc;
      }, {}),
    [devices, rooms],
  );

  const totalEnergy = energyUsage.reduce((sum, e) => sum + e.value, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <Header
        alertCount={alerts.length}
        devicesOnline={stats.devicesOnCount}
        totalDevices={stats.totalDevices}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          rooms={rooms}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
          deviceCountByRoom={deviceCountByRoom}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              label="Dispositivos ativos"
              value={stats.devicesOnCount}
              icon={<Power size={20} className="text-blue-600" />}
              color="bg-blue-100"
              sub={"de " + stats.totalDevices + " total"}
            />
            <StatCard
              label="Consumo hoje"
              value={totalEnergy.toFixed(1) + " kWh"}
              icon={<Zap size={20} className="text-yellow-600" />}
              color="bg-yellow-100"
            />
            <StatCard
              label="Offline"
              value={stats.devicesOfflineCount}
              icon={<WifiOff size={20} className="text-red-500" />}
              color="bg-red-100"
              sub="dispositivos"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WeatherWidget weather={weather} />
            <AlertsPanel alerts={alerts} onDismiss={dismissAlert} />
          </div>

          <EnergyPanel usage={energyUsage} />

          <RoomTabs
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
          />

          <div>
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-3">
              {selectedRoomId
                ? rooms.find(r => r.id === selectedRoomId)?.name
                : 'Todos os dispositivos'}
              <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
                ({filteredDevices.length})
              </span>
            </h2>
            <DeviceGrid
              devices={filteredDevices}
              onToggle={toggleDevice}
              onUpdate={updateDevice}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
