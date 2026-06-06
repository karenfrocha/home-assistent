import type { Device, FanDevice, LightDevice } from '../../types';
import { LightCard } from '../devices/LightCard';
import { ThermostatCard } from '../devices/ThermostatCard';
import { LockCard } from '../devices/LockCard';
import { FanCard } from '../devices/FanCard';
import { CameraCard } from '../devices/CameraCard';
import { BlindCard } from '../devices/BlindCard';
import { SpeakerCard } from '../devices/SpeakerCard';
import { PlugCard } from '../devices/PlugCard';

interface DeviceGridProps {
  devices: Device[];
  onToggle: (id: string) => void;
  onUpdate: <T extends Device>(id: string, patch: Partial<T>) => void;
}

export function DeviceGrid({ devices, onToggle, onUpdate }: DeviceGridProps) {
  if (devices.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-10">
        Nenhum dispositivo encontrado para este cômodo.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {devices.map(device => {
        switch (device.type) {
          case 'light':
            return (
              <LightCard
                key={device.id}
                device={device}
                onToggle={onToggle}
                onBrightnessChange={(id, brightness) =>
                  onUpdate<LightDevice>(id, { brightness })
                }
                onColorTempChange={(id, colorTemp) =>
                  onUpdate<LightDevice>(id, { colorTemp })
                }
              />
            );
          case 'thermostat':
            return (
              <ThermostatCard
                key={device.id}
                device={device}
                onToggle={onToggle}
                onTargetTempChange={(id, targetTemp) =>
                  onUpdate(id, { targetTemp })
                }
              />
            );
          case 'lock':
            return (
              <LockCard
                key={device.id}
                device={device}
                onToggleLock={id => onUpdate(id, { isLocked: !device.isLocked })}
              />
            );
          case 'fan':
            return (
              <FanCard
                key={device.id}
                device={device}
                onToggle={onToggle}
                onSpeedChange={(id, speed) =>
                  onUpdate<FanDevice>(id, { speed })
                }
              />
            );
          case 'camera':
            return <CameraCard key={device.id} device={device} />;
          case 'blind':
            return (
              <BlindCard
                key={device.id}
                device={device}
                onPositionChange={(id, position) => onUpdate(id, { position })}
              />
            );
          case 'speaker':
            return (
              <SpeakerCard
                key={device.id}
                device={device}
                onToggle={onToggle}
                onVolumeChange={(id, volume) => onUpdate(id, { volume })}
              />
            );
          case 'plug':
            return (
              <PlugCard key={device.id} device={device} onToggle={onToggle} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
