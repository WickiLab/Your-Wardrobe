"use client";

import { useState } from "react";
import {
  Home,
  Shirt,
  Calendar as CalendarIcon,
  CreditCard,
  Sparkles,
  LogOut,
} from '@/lib/lucide-icons';

import { TIERS } from "../lib/constants";
import NavItem from "./NavItem";
import LoginScreen from "./LoginScreen";
import WardrobeScreen from "./WardrobeScreen";
import OutfitsScreen from "./OutfitsScreen";
import CalendarScreen from "./CalendarScreen";
import PremiumScreen from "./PremiumScreen";
import AddClothesModal from "./modals/AddClothesModal";
import OutfitBuilderModal from "./modals/OutfitBuilderModal";
import AddEventModal from "./modals/AddEventModal";

export default function AppShell() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("wardrobe");

  const [clothes, setClothes] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [events, setEvents] = useState([]);

  const [isAddingClothes, setIsAddingClothes] = useState(false);
  const [isBuildingOutfit, setIsBuildingOutfit] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const handleLogin = (email) => {
    setUser({ email, tier: "free" });
  };

  const handleLogout = () => {
    setUser(null);
    setClothes([]);
    setOutfits([]);
    setEvents([]);
    setActiveTab("wardrobe");
  };

  const handleUpgrade = (tierKey) => {
    setUser((prev) => ({ ...prev, tier: tierKey }));
    alert(`Upgraded to ${TIERS[tierKey].name} plan!`);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const currentTier = TIERS[user.tier];
  const isOverLimit = clothes.length >= currentTier.hangers;

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen font-sans text-gray-800">
      <div className="w-full max-w-md bg-white h-screen flex flex-col relative shadow-2xl overflow-hidden">
        <header className="px-6 py-4 bg-white border-b border-gray-100 flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Shirt size={20} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Wardrobe
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-600"
          >
            <LogOut size={20} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 pb-24">
          {activeTab === "wardrobe" && (
            <WardrobeScreen
              clothes={clothes}
              setClothes={setClothes}
              isOverLimit={isOverLimit}
              currentTier={currentTier}
              onAddClick={() => setIsAddingClothes(true)}
            />
          )}

          {activeTab === "outfits" && (
            <OutfitsScreen
              outfits={outfits}
              setOutfits={setOutfits}
              clothes={clothes}
              userTier={user.tier}
              onCreateClick={() => setIsBuildingOutfit(true)}
            />
          )}

          {activeTab === "calendar" && (
            <CalendarScreen
              events={events}
              outfits={outfits}
              onAddClick={() => setIsAddingEvent(true)}
            />
          )}

          {activeTab === "premium" && (
            <PremiumScreen
              currentTierKey={user.tier}
              onUpgrade={handleUpgrade}
            />
          )}
        </main>

        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 pb-6 px-2 z-20">
          <NavItem
            icon={<Home size={24} />}
            label="Wardrobe"
            isActive={activeTab === "wardrobe"}
            onClick={() => setActiveTab("wardrobe")}
          />
          <NavItem
            icon={<Sparkles size={24} />}
            label="Outfits"
            isActive={activeTab === "outfits"}
            onClick={() => setActiveTab("outfits")}
          />
          <NavItem
            icon={<CalendarIcon size={24} />}
            label="Calendar"
            isActive={activeTab === "calendar"}
            onClick={() => setActiveTab("calendar")}
          />
          <NavItem
            icon={<CreditCard size={24} />}
            label="Premium"
            isActive={activeTab === "premium"}
            onClick={() => setActiveTab("premium")}
          />
        </nav>

        {isAddingClothes && (
          <AddClothesModal
            onClose={() => setIsAddingClothes(false)}
            onAdd={(item) => {
              setClothes((prev) => [...prev, item]);
              setIsAddingClothes(false);
            }}
          />
        )}

        {isBuildingOutfit && (
          <OutfitBuilderModal
            clothes={clothes}
            onClose={() => setIsBuildingOutfit(false)}
            onSave={(outfit) => {
              setOutfits((prev) => [...prev, outfit]);
              setIsBuildingOutfit(false);
            }}
          />
        )}

        {isAddingEvent && (
          <AddEventModal
            outfits={outfits}
            onClose={() => setIsAddingEvent(false)}
            onSave={(event) => {
              setEvents((prev) =>
                [...prev, event].sort(
                  (a, b) => new Date(a.date) - new Date(b.date)
                )
              );
              setIsAddingEvent(false);
            }}
          />
        )}
      </div>
    </div>
  );
}