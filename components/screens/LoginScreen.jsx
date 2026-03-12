'use client';

import React, { useState } from 'react';
import { Shirt } from '@/lib/lucide-icons';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shirt size={32} />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Digital Wardrobe</h1>
        <p className="text-gray-500 mb-8 text-sm">
          Organize your closet, plan your outfits.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) onLogin(email);
          }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Continue
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-400">
          <p>Test Mode: Any email works.</p>
        </div>
      </div>
    </div>
  );
}