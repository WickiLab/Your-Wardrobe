'use client';

import React, { useState } from 'react';
import { Check, Shirt, X } from '@/lib/lucide-icons';

export default function OutfitBuilderModal({ clothes, onClose, onSave }) {
  const [name, setName] = useState('');
  const [selectedItems, setSelectedItems] = useState({});

  const handleSelect = (category, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category]?.id === item.id ? null : item,
    }));
  };

  const handleSave = () => {
    const itemsArray = Object.values(selectedItems).filter(Boolean);
    if (itemsArray.length === 0) {
      alert('Please select at least one item!');
      return;
    }

    onSave({
      id: Date.now().toString(),
      name: name || `My Outfit #${Math.floor(Math.random() * 1000)}`,
      items: itemsArray,
    });
  };

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col animate-slide-in-right">
      <div className="p-4 border-b flex justify-between items-center bg-white shadow-sm z-10">
        <h2 className="font-bold text-lg">Create Outfit</h2>
        <button onClick={onClose} className="p-1 bg-gray-100 rounded-full">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 pb-24">
        <input
          type="text"
          placeholder="Outfit Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-6 shadow-sm"
        />

        {['Top', 'Bottom', 'Dress', 'Shoes'].map((cat) => {
          const itemsInCat = clothes.filter((c) => c.category === cat);
          if (itemsInCat.length === 0) return null;

          return (
            <div key={cat} className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                {cat}
                {selectedItems[cat] && (
                  <span className="bg-green-100 text-green-700 p-0.5 rounded-full">
                    <Check size={12} />
                  </span>
                )}
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {itemsInCat.map((item) => {
                  const isSelected = selectedItems[cat]?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(cat, item)}
                      className={`snap-start w-24 flex-shrink-0 flex flex-col gap-1 transition-all ${
                        isSelected ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                      }`}
                    >
                      <div
                        className={`w-24 h-24 rounded-xl overflow-hidden bg-gray-200 border-2 ${
                          isSelected
                            ? 'border-indigo-600 shadow-md'
                            : 'border-transparent'
                        }`}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Shirt size={24} />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-center font-medium truncate px-1 text-gray-600">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-0 w-full p-4 bg-white border-t">
        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-700"
        >
          Save Outfit
        </button>
      </div>
    </div>
  );
}