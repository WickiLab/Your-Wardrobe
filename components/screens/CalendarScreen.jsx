'use client';

import { Calendar as CalendarIcon, Plus, Shirt } from '@/lib/lucide-icons';

export default function CalendarScreen({ events, outfits, onAddClick }) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Event Planner</h2>
        <button
          onClick={onAddClick}
          className="bg-indigo-100 text-indigo-700 p-2 rounded-full hover:bg-indigo-200"
        >
          <Plus size={16} />
        </button>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-500">
            <CalendarIcon size={24} />
          </div>
          <p className="text-gray-500 text-sm mb-4">
            No upcoming events. Plan your week!
          </p>
          <button
            onClick={onAddClick}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-md"
          >
            Add Event
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedEvents.map((ev) => {
            const outfit = outfits.find((o) => o.id === ev.outfitId);

            return (
              <div
                key={ev.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"
              >
                <div className="bg-indigo-50 text-indigo-600 text-center p-2 rounded-lg min-w-[60px]">
                  <div className="text-xs font-bold uppercase">
                    {new Date(ev.date).toLocaleString('default', { month: 'short' })}
                  </div>
                  <div className="text-lg font-black leading-none">
                    {new Date(ev.date).getDate()}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{ev.title}</h3>
                  <p className="text-xs text-gray-500">
                    {outfit ? `Wearing: ${outfit.name}` : 'No outfit assigned'}
                  </p>
                </div>
                {outfit && outfit.items[0] && (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
                    {outfit.items[0].image ? (
                      <img
                        src={outfit.items[0].image}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : (
                      <Shirt size={16} className="m-auto h-full text-gray-300" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}