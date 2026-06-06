import type {
  Room,
  LightDevice,
  ThermostatDevice,
  LockDevice,
  FanDevice,
  CameraDevice,
  BlindDevice,
  SpeakerDevice,
  PlugDevice,
  Device,
  WeatherInfo,
  EnergyUsage,
  Alert,
} from '../types';

export const ROOMS: Room[] = [
  { id: 'living', name: 'Sala de Estar', icon: '🛋️', temperature: 23, humidity: 55 },
  { id: 'master', name: 'Quarto Principal', icon: '🛏️', temperature: 21, humidity: 50 },
  { id: 'kitchen', name: 'Cozinha', icon: '🍳', temperature: 25, humidity: 60 },
  { id: 'bathroom', name: 'Banheiro', icon: '🚿', temperature: 24, humidity: 70 },
  { id: 'office', name: 'Escritório', icon: '💻', temperature: 22, humidity: 48 },
  { id: 'garage', name: 'Garagem', icon: '🚗', temperature: 28, humidity: 45 },
];

const lights: LightDevice[] = [
  {
    id: 'l1', name: 'Lustre Principal', type: 'light', roomId: 'living',
    status: 'online', isOn: true, brightness: 80, colorTemp: 3000,
  },
  {
    id: 'l2', name: 'Luminária Sofá', type: 'light', roomId: 'living',
    status: 'online', isOn: false, brightness: 50, colorTemp: 2700,
  },
  {
    id: 'l3', name: 'Luz Teto', type: 'light', roomId: 'master',
    status: 'online', isOn: false, brightness: 60, colorTemp: 4000,
  },
  {
    id: 'l4', name: 'Abajur', type: 'light', roomId: 'master',
    status: 'online', isOn: true, brightness: 30, colorTemp: 2700,
  },
  {
    id: 'l5', name: 'Luz Bancada', type: 'light', roomId: 'kitchen',
    status: 'online', isOn: true, brightness: 100, colorTemp: 5000,
  },
  {
    id: 'l6', name: 'Luz Mesa', type: 'light', roomId: 'office',
    status: 'online', isOn: true, brightness: 70, colorTemp: 4500,
  },
];

const thermostats: ThermostatDevice[] = [
  {
    id: 't1', name: 'Ar-Condicionado', type: 'thermostat', roomId: 'living',
    status: 'online', isOn: true, currentTemp: 23, targetTemp: 22,
    mode: 'cool', humidity: 55,
  },
  {
    id: 't2', name: 'Climatizador', type: 'thermostat', roomId: 'master',
    status: 'online', isOn: true, currentTemp: 21, targetTemp: 20,
    mode: 'cool', humidity: 50,
  },
  {
    id: 't3', name: 'Ar-Condicionado', type: 'thermostat', roomId: 'office',
    status: 'offline', isOn: false, currentTemp: 22, targetTemp: 22,
    mode: 'off', humidity: 48,
  },
];

const locks: LockDevice[] = [
  {
    id: 'lk1', name: 'Porta Entrada', type: 'lock', roomId: 'garage',
    status: 'online', isOn: true, isLocked: true, lastActivity: '08:32',
  },
  {
    id: 'lk2', name: 'Portão Garagem', type: 'lock', roomId: 'garage',
    status: 'online', isOn: true, isLocked: true, lastActivity: '07:55',
  },
];

const fans: FanDevice[] = [
  {
    id: 'f1', name: 'Ventilador', type: 'fan', roomId: 'master',
    status: 'online', isOn: false, speed: 2,
  },
  {
    id: 'f2', name: 'Ventilador Teto', type: 'fan', roomId: 'living',
    status: 'online', isOn: true, speed: 1,
  },
];

const cameras: CameraDevice[] = [
  {
    id: 'c1', name: 'Câmera Frente', type: 'camera', roomId: 'garage',
    status: 'online', isOn: true, motionDetected: false, recording: true,
  },
  {
    id: 'c2', name: 'Câmera Fundo', type: 'camera', roomId: 'garage',
    status: 'online', isOn: true, motionDetected: true, recording: true,
  },
];

const blinds: BlindDevice[] = [
  {
    id: 'b1', name: 'Persiana Janela', type: 'blind', roomId: 'living',
    status: 'online', isOn: true, position: 75,
  },
  {
    id: 'b2', name: 'Persiana Varanda', type: 'blind', roomId: 'living',
    status: 'online', isOn: true, position: 100,
  },
  {
    id: 'b3', name: 'Persiana Quarto', type: 'blind', roomId: 'master',
    status: 'online', isOn: true, position: 0,
  },
];

const speakers: SpeakerDevice[] = [
  {
    id: 's1', name: 'Smart Speaker', type: 'speaker', roomId: 'living',
    status: 'online', isOn: true, volume: 40, currentTrack: 'Lofi Hip Hop Radio',
  },
  {
    id: 's2', name: 'Caixa Bluetooth', type: 'speaker', roomId: 'kitchen',
    status: 'online', isOn: false, volume: 60,
  },
];

const plugs: PlugDevice[] = [
  {
    id: 'p1', name: 'Tomada TV', type: 'plug', roomId: 'living',
    status: 'online', isOn: true, powerConsumption: 120,
  },
  {
    id: 'p2', name: 'Tomada Escritório', type: 'plug', roomId: 'office',
    status: 'online', isOn: true, powerConsumption: 280,
  },
  {
    id: 'p3', name: 'Carregador', type: 'plug', roomId: 'master',
    status: 'online', isOn: true, powerConsumption: 15,
  },
];

export const DEVICES: Device[] = [
  ...lights,
  ...thermostats,
  ...locks,
  ...fans,
  ...cameras,
  ...blinds,
  ...speakers,
  ...plugs,
];

export const WEATHER: WeatherInfo = {
  city: 'São Paulo',
  temperature: 26,
  condition: 'Parcialmente nublado',
  humidity: 65,
  windSpeed: 12,
};

export const ENERGY_USAGE: EnergyUsage[] = [
  { label: 'Ar-Condicionado', value: 3.2, percentage: 38 },
  { label: 'Iluminação', value: 1.1, percentage: 13 },
  { label: 'Eletrodomésticos', value: 2.5, percentage: 30 },
  { label: 'Eletrônicos', value: 1.6, percentage: 19 },
];

export const ALERTS: Alert[] = [
  {
    id: 'a1', type: 'warning',
    message: 'Movimento detectado na câmera do fundo',
    timestamp: '10:14', dismissed: false,
  },
  {
    id: 'a2', type: 'info',
    message: 'Ar-condicionado do escritório está offline',
    timestamp: '09:50', dismissed: false,
  },
  {
    id: 'a3', type: 'danger',
    message: 'Janela do quarto principal aberta com chuva prevista',
    timestamp: '09:30', dismissed: false,
  },
];
