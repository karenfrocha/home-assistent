import { Cloud, Droplets, Wind } from 'lucide-react';
import type { WeatherInfo } from '../../types';
import { Card } from '../ui/Card';

interface WeatherWidgetProps {
  weather: WeatherInfo;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-700 border-0 text-white">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm opacity-80">{weather.city}</p>
          <p className="text-4xl font-bold">{weather.temperature}°C</p>
          <p className="text-sm opacity-90 mt-1 flex items-center gap-1">
            <Cloud size={14} />
            {weather.condition}
          </p>
        </div>
      </div>
      <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
        <span className="flex items-center gap-1.5 text-sm opacity-80">
          <Droplets size={14} />
          {weather.humidity}% umidade
        </span>
        <span className="flex items-center gap-1.5 text-sm opacity-80">
          <Wind size={14} />
          {weather.windSpeed} km/h
        </span>
      </div>
    </Card>
  );
}
