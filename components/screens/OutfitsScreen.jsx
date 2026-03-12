'use client';

import { Sparkles, Trash2, Plus, Shirt } from '@/lib/lucide-icons';

export default function OutfitsScreen({
  outfits,
  setOutfits,
  clothes,
  userTier,
  onCreateClick,
}) {
  const generateAIOutfit = () => {
    const tops = clothes.filter((c) => c.category === 'Top');
    const bottoms = clothes.filter((c) => c.category === 'Bottom');

    if (tops.length === 0 || bottoms.length === 0) {
      alert(
        'You need at least one top and one bottom in your wardrobe to generate an outfit!'
      );
      return;
    }

    const randomTop = tops[Math.floor(Math.random() * tops.length)];
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];

    const newOutfit = {
      id: Date.now().toString(),
      name: `AI Suggestion #${outfits.length + 1}`,
      items: [randomTop, randomBottom],
    };

    setOutfits([newOutfit, ...outfits]);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this outfit?')) {
      setOutfits(outfits.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Looks</h2>
        {['tier2', 'tier3'].includes(userTier) && (
          <button
            onClick={generateAIOutfit}
            className="flex items-center gap-1 text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-200"
          >
            <Sparkles size={12} /> AI Pick
          </button>
        )}
      </div>

      {outfits.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-500">
            <Sparkles size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">No outfits yet</h3>
          <p className="text-gray-500 text-sm mb-4">
            Combine your clothes to create looks.
          </p>
          <button
            onClick={onCreateClick}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-md"
          >
            Create Outfit
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={onCreateClick}
            className="w-full border-2 border-dashed border-gray-300 text-gray-500 py-3 rounded-xl font-medium flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={18} /> Create New Look
          </button>

          {outfits.map((outfit) => (
            <div
              key={outfit.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800">{outfit.name}</h3>
                <button
                  onClick={() => handleDelete(outfit.id)}
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {outfit.items.map((item) => (
                  <div
                    key={item.id}
                    className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center text-gray-300">
                        <Shirt size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}