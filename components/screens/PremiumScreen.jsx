'use client';

import { Check } from '@/lib/lucide-icons';
import { TIERS } from '../../lib/constants';

export default function PremiumScreen({ currentTierKey, onUpgrade }) {
  return (
    <div className="p-4 pb-24">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Subscription</h2>
      <p className="text-sm text-gray-500 mb-6">
        Unlock more hangers and AI features.
      </p>

      <div className="space-y-4">
        {Object.entries(TIERS).map(([key, tier]) => {
          const isCurrent = key === currentTierKey;

          return (
            <div
              key={key}
              className={`p-5 rounded-2xl border-2 transition-all ${
                isCurrent
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-indigo-200'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-800">{tier.name}</h3>
                <div className="text-lg font-black text-indigo-600">
                  {tier.price}
                  <span className="text-xs text-gray-500 font-normal">/mo</span>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-green-500" /> {feat}
                  </li>
                ))}
              </ul>

              <button
                disabled={isCurrent}
                onClick={() => onUpgrade(key)}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  isCurrent
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                }`}
              >
                {isCurrent ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}