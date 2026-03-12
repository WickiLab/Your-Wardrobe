'use client';

import React, { useMemo, useState } from 'react';
import { Shirt, Trash2, Plus } from '@/lib/lucide-icons';
import { CATEGORIES } from '../../lib/constants';

export default function WardrobeScreen({
  clothes,
  setClothes,
  isOverLimit,
  currentTier,
  onAddClick,
}) {
  const [filter, setFilter] = useState('All');

  const filteredClothes = useMemo(() => {
    if (filter === 'All') return clothes;
    return clothes.filter((c) => c.category === filter);
  }, [clothes, filter]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this item?')) {
      setClothes(clothes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-4 h-full relative">
      <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h2 className="font-bold text-gray-800">Your Hangers</h2>
          <p className="text-xs text-gray-500">
            {clothes.length} / {currentTier.hangers} used ({currentTier.name} Plan)
          </p>
        </div>
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 flex items-center justify-center">
          <span className="text-sm font-bold text-indigo-600">{clothes.length}</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              filter === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredClothes.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
            <Shirt size={24} />
          </div>
          <p className="text-gray-500 text-sm">No clothes in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-20">
          {filteredClothes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group relative"
            >
              <div className="aspect-square bg-gray-100 relative">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Shirt size={40} />
                  </div>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {item.name}
                </h3>
                <div className="flex gap-1 mt-1 flex-wrap">
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                    {item.occasion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          if (isOverLimit) {
            alert(
              'Hanger limit reached! Please upgrade your plan in the Premium tab to add more clothes.'
            );
          } else {
            onAddClick();
          }
        }}
        className={`absolute bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform active:scale-95 ${
          isOverLimit ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        <Plus size={24} />
      </button>
    </div>
  );
}