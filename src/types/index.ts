export type DeviceType =
  | 'light'
  | 'thermostat'
  | 'lock'
  | 'fan'
  | 'camera'
  | 'blind'
  | 'speaker'
  | 'plug';

export type DeviceStatus = 'online' | 'offline' | 'error';

export interface BaseDevice {
  id: string;
  name: string;
  type: DeviceType;
  roomId: string;
  status: DeviceStatus;
  isOn: boolean;
}

export interface LightDevice extends BaseDevice {
  type: 'light';
  brightness: number; // 0–100
  colorTemp: number;  // 2700–6500 K
}

export interface ThermostatDevice extends BaseDevice {
  type: 'thermostat';
  currentTemp: number;
  targetTemp: number;
  mode: 'heat' | 'cool' | 'auto' | 'off';
  humidity: number;
}

export interface LockDevice extends BaseDevice {
  type: 'lock';
  isLocked: boolean;
  lastActivity: string;
}

export interface FanDevice extends BaseDevice {
  type: 'fan';
  speed: 1 | 2 | 3 | 4; // 1=low … 4=turbo
}

export interface CameraDevice extends BaseDevice {
  type: 'camera';
  motionDetected: boolean;
  recording: boolean;
}

export interface BlindDevice extends BaseDevice {
  type: 'blind';
  position: number; // 0=closed, 100=open
}

export interface SpeakerDevice extends BaseDevice {
  type: 'speaker';
  volume: number; // 0–100
  currentTrack?: string;
}

export interface PlugDevice extends BaseDevice {
  type: 'plug';
  powerConsumption: number; // watts
}

export type Device =
  | LightDevice
  | ThermostatDevice
  | LockDevice
  | FanDevice
  | CameraDevice
  | BlindDevice
  | SpeakerDevice
  | PlugDevice;

export interface Room {
  id: string;
  name: string;
  icon: string;
  temperature: number;
  humidity: number;
}

export interface WeatherInfo {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface EnergyUsage {
  label: string;
  value: number; // kWh
  percentage: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'danger';
  message: string;
  timestamp: string;
  dismissed: boolean;
}
