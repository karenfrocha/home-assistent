import type { Room } from '../../types';

interface SidebarProps {
  rooms: Room[];
  selectedRoomId: string | null;
  onSelectRoom: (id: string | null) => void;
  deviceCountByRoom: Record<string, number>;
}

export function Sidebar({
  rooms,
  selectedRoomId,
  onSelectRoom,
  deviceCountByRoom,
}: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-4 hidden lg:block transition-colors">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">
        Cômodos
      </p>
      <nav className="space-y-1">
        <button
          onClick={() => onSelectRoom(null)}
          className={[
            'w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors',
            selectedRoomId === null
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
          ].join(' ')}
        >
          Todos os cômodos
        </button>
        {rooms.map(room => (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className={[
              'w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between',
              selectedRoomId === room.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            ].join(' ')}
          >
            <span className="flex items-center gap-2">
              <span>{room.icon}</span>
              <span>{room.name}</span>
            </span>
            {deviceCountByRoom[room.id] != null && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedRoomId === room.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {deviceCountByRoom[room.id]}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
