'use client';

import React, { useState } from 'react';
import { Upload, X } from '@/lib/lucide-icons';
import { CATEGORIES, OCCASIONS } from '../../lib/constants';

export default function AddClothesModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [color, setColor] = useState('');
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [imageStr, setImageStr] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageStr(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      name: name || `${color} ${category}`,
      category,
      color,
      occasion,
      image: imageStr,
    });
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full h-[85%] sm:h-auto sm:max-h-[90%] sm:w-[90%] sm:rounded-2xl rounded-t-2xl flex flex-col animate-slide-up sm:animate-none">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Add to Wardrobe</h2>
          <button onClick={onClose} className="p-1 bg-gray-100 rounded-full">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <form id="add-clothes-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gray-50 h-40">
              {imageStr ? (
                <img
                  src={imageStr}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <Upload className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-500 font-medium">Tap to upload photo</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required={!imageStr}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                Item Name
              </label>
              <input
                type="text"
                placeholder="e.g. Blue Denim Jacket"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {OCCASIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                Color
              </label>
              <input
                type="text"
                placeholder="e.g. Navy Blue"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </form>
        </div>

        <div className="p-4 border-t bg-gray-50 sm:rounded-b-2xl">
          <button
            type="submit"
            form="add-clothes-form"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700"
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
}