import { useState, useCallback } from 'react';
import {
  DEVICES,
  ROOMS,
  WEATHER,
  ENERGY_USAGE,
  ALERTS,
} from '../data/mockData';
import type { Device, Alert } from '../types';

export function useHomeState() {
  const [devices, setDevices] = useState<Device[]>(DEVICES);
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS);

  const toggleDevice = useCallback((deviceId: string) => {
    setDevices(prev =>
      prev.map(d => (d.id === deviceId ? { ...d, isOn: !d.isOn } : d)),
    );
  }, []);

  const updateDevice = useCallback(
    <T extends Device>(deviceId: string, patch: Partial<T>) => {
      setDevices(prev =>
        prev.map(d => (d.id === deviceId ? ({ ...d, ...patch } as Device) : d)),
      );
    },
    [],
  );

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, dismissed: true } : a)),
    );
  }, []);

  const activeAlerts = alerts.filter(a => !a.dismissed);
  const devicesOnCount = devices.filter(d => d.isOn && d.status === 'online').length;
  const devicesOfflineCount = devices.filter(d => d.status === 'offline').length;

  return {
    rooms: ROOMS,
    devices,
    weather: WEATHER,
    energyUsage: ENERGY_USAGE,
    alerts: activeAlerts,
    stats: { devicesOnCount, devicesOfflineCount, totalDevices: devices.length },
    toggleDevice,
    updateDevice,
    dismissAlert,
  };
}
