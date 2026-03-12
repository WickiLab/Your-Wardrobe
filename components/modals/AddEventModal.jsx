'use client';

import React, { useState } from 'react';
import { X } from '@/lib/lucide-icons';

export default function AddEventModal({ outfits, onClose, onSave }) {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [selectedOutfitId, setSelectedOutfitId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now().toString(),
      date,
      title,
      outfitId: selectedOutfitId,
    });
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full sm:w-[90%] p-5 sm:rounded-2xl rounded-t-2xl shadow-xl animate-slide-up sm:animate-none">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Plan Event</h2>
          <button onClick={onClose} className="p-1 bg-gray-100 rounded-full">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
              Event Title
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah's Wedding"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
              Select Outfit
            </label>
            <select
              value={selectedOutfitId}
              onChange={(e) => setSelectedOutfitId(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none"
            >
              <option value="">No outfit assigned</option>
              {outfits.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl mt-4"
          >
            Save Event
          </button>
        </form>
      </div>
    </div>
  );
}