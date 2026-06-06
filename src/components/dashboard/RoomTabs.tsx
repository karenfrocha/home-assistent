import type { Room } from '../../types';

interface RoomTabsProps {
  rooms: Room[];
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
}

export function RoomTabs({ rooms, selectedRoomId, onSelectRoom }: RoomTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
      <button
        onClick={() => onSelectRoom(null)}
        className={[
          'shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors',
          selectedRoomId === null
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600',
        ].join(' ')}
      >
        Todos
      </button>
      {rooms.map(room => (
        <button
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
          className={[
            'shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors flex items-center gap-1',
            selectedRoomId === room.id
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600',
          ].join(' ')}
        >
          <span>{room.icon}</span>
          <span>{room.name}</span>
        </button>
      ))}
    </div>
  );
}
