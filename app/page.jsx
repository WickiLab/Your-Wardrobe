'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  Calendar as CalendarIcon,
  Check,
  ChevronRight,
  CreditCard,
  Edit2,
  Home,
  Lock,
  LogOut,
  Plus,
  Settings,
  Shirt,
  ShoppingCart,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  User,
  Users,
  X,
} from '@/lib/lucide-icons';

import { CATEGORIES, OCCASIONS, SEASONS, TIERS } from '@/lib/constants';

const DEMO_CLOTHES = [
  {
    id: 'demo-top',
    name: 'Ivory Knit Top',
    category: 'Top',
    color: 'Ivory',
    occasion: 'Work',
    season: 'Spring',
    image: null,
  },
  {
    id: 'demo-bottom',
    name: 'Tailored Navy Trousers',
    category: 'Bottom',
    color: 'Navy',
    occasion: 'Work',
    season: 'All Season',
    image: null,
  },
  {
    id: 'demo-shoes',
    name: 'White Court Sneakers',
    category: 'Shoes',
    color: 'White',
    occasion: 'Casual',
    season: 'All Season',
    image: null,
  },
];

const DEMO_OUTFIT = {
  id: 'demo-outfit',
  name: 'City Smart Casual',
  items: {
    top: DEMO_CLOTHES[0],
    bottom: DEMO_CLOTHES[1],
    shoes: DEMO_CLOTHES[2],
    accessories: null,
  },
};

const DEMO_EVENT = {
  id: 'demo-event',
  title: 'Friday Team Lunch',
  date: '2026-03-20',
  outfitId: DEMO_OUTFIT.id,
};

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [activeModal, setActiveModal] = useState(null);

  const [user, setUser] = useState(null);
  const [clothes, setClothes] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [events, setEvents] = useState([]);

  const openModal = (type, data = null) => setActiveModal({ type, data });
  const closeModal = () => setActiveModal(null);

  const handleLogin = (email) => {
    const name = email.split('@')[0];
    setUser({ name, email, tier: 'free' });
    setClothes(DEMO_CLOTHES);
    setOutfits([DEMO_OUTFIT]);
    setEvents([DEMO_EVENT]);
    setCurrentScreen('main');
    setActiveTab('home');
  };

  const handleLogout = () => {
    setUser(null);
    setClothes([]);
    setOutfits([]);
    setEvents([]);
    setActiveModal(null);
    setCurrentScreen('welcome');
    setActiveTab('home');
  };

  const handleUpgrade = (tierId) => {
    setUser((prev) => ({ ...prev, tier: tierId }));
    closeModal();
  };

  const checkLimit = () => {
    if (!user) return false;
    if (clothes.length >= TIERS[user.tier].hangers) {
      openModal('upgradePrompt');
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-3 py-4 text-gray-800 sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[92vh] w-full max-w-5xl items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-0 shadow-[0_30px_120px_rgba(15,23,42,0.45)] backdrop-blur sm:p-4">
        <div className="flex min-h-[92vh] w-full justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-0 sm:min-h-[86vh] sm:rounded-[2rem] sm:p-4">
          <div className="relative flex h-[92vh] w-full max-w-md flex-col overflow-hidden bg-white sm:h-[84vh] sm:rounded-[2rem] sm:border sm:border-slate-200 sm:shadow-2xl">
            {currentScreen === 'splash' && (
              <SplashScreen onComplete={() => setCurrentScreen('welcome')} />
            )}

            {currentScreen === 'welcome' && (
              <WelcomeScreen onLogin={() => setCurrentScreen('auth')} />
            )}

            {currentScreen === 'auth' && (
              <AuthScreen
                onLogin={handleLogin}
                onBack={() => setCurrentScreen('welcome')}
              />
            )}

            {currentScreen === 'main' && user && (
              <>
                {activeTab !== 'profile' && (
                  <header className="z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-indigo-600 p-2 text-white shadow-lg shadow-indigo-200">
                        <Shirt size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                          Digital Wardrobe
                        </p>
                        <h1 className="text-xl font-bold text-gray-800">
                          {activeTab === 'home' && 'Dashboard'}
                          {activeTab === 'wardrobe' && 'My Wardrobe'}
                          {activeTab === 'outfits' && 'Outfits'}
                          {activeTab === 'events' && 'Event Planner'}
                        </h1>
                      </div>
                    </div>
                    <button className="relative rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700">
                      <Bell size={20} />
                      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
                    </button>
                  </header>
                )}

                <main className="scrollbar-hide flex-1 overflow-y-auto bg-gray-50 pb-24">
                  {activeTab === 'home' && (
                    <HomeScreen
                      user={user}
                      clothes={clothes}
                      outfits={outfits}
                      events={events}
                      onNavigate={setActiveTab}
                      onOpenFeature={openModal}
                    />
                  )}
                  {activeTab === 'wardrobe' && (
                    <WardrobeScreen
                      clothes={clothes}
                      userTier={user.tier}
                      onAddClick={() => checkLimit() && openModal('addClothes')}
                      onItemClick={(item) => openModal('itemDetail', item)}
                    />
                  )}
                  {activeTab === 'outfits' && (
                    <OutfitsScreen
                      outfits={outfits}
                      onCreateClick={() => openModal('buildOutfit')}
                      onOutfitClick={(outfit) => openModal('outfitDetail', outfit)}
                    />
                  )}
                  {activeTab === 'events' && (
                    <EventsScreen
                      events={events}
                      outfits={outfits}
                      onAddClick={() => openModal('addEvent')}
                    />
                  )}
                  {activeTab === 'profile' && (
                    <ProfileScreen
                      user={user}
                      clothes={clothes}
                      outfits={outfits}
                      events={events}
                      onLogout={handleLogout}
                      openModal={openModal}
                    />
                  )}
                </main>

                <nav className="absolute bottom-0 z-20 flex w-full justify-around border-t border-gray-200 bg-white px-2 py-2 pb-6">
                  <NavItem
                    icon={<Home size={22} />}
                    label="Home"
                    isActive={activeTab === 'home'}
                    onClick={() => setActiveTab('home')}
                  />
                  <NavItem
                    icon={<Shirt size={22} />}
                    label="Wardrobe"
                    isActive={activeTab === 'wardrobe'}
                    onClick={() => setActiveTab('wardrobe')}
                  />
                  <NavItem
                    icon={<Sparkles size={22} />}
                    label="Outfits"
                    isActive={activeTab === 'outfits'}
                    onClick={() => setActiveTab('outfits')}
                  />
                  <NavItem
                    icon={<CalendarIcon size={22} />}
                    label="Events"
                    isActive={activeTab === 'events'}
                    onClick={() => setActiveTab('events')}
                  />
                  <NavItem
                    icon={<User size={22} />}
                    label="Profile"
                    isActive={activeTab === 'profile'}
                    onClick={() => setActiveTab('profile')}
                  />
                </nav>

                {activeModal?.type === 'addClothes' && (
                  <AddClothesModal
                    onClose={closeModal}
                    onSave={(item) => {
                      setClothes((prev) => [...prev, item]);
                      closeModal();
                    }}
                  />
                )}

                {activeModal?.type === 'itemDetail' && (
                  <ItemDetailModal
                    item={activeModal.data}
                    onClose={closeModal}
                    onDelete={(id) => {
                      setClothes((prev) => prev.filter((c) => c.id !== id));
                      setOutfits((prev) =>
                        prev
                          .map((outfit) => ({
                            ...outfit,
                            items: Object.fromEntries(
                              Object.entries(outfit.items).map(([slot, item]) => [
                                slot,
                                item?.id === id ? null : item,
                              ])
                            ),
                          }))
                          .filter((outfit) => Object.values(outfit.items).some(Boolean))
                      );
                      closeModal();
                    }}
                  />
                )}

                {activeModal?.type === 'buildOutfit' && (
                  <OutfitBuilderModal
                    clothes={clothes}
                    onClose={closeModal}
                    onSave={(outfit) => {
                      setOutfits((prev) => [outfit, ...prev]);
                      closeModal();
                    }}
                  />
                )}

                {activeModal?.type === 'outfitDetail' && (
                  <OutfitDetailModal
                    outfit={activeModal.data}
                    onClose={closeModal}
                    onDelete={(id) => {
                      setOutfits((prev) => prev.filter((outfit) => outfit.id !== id));
                      setEvents((prev) =>
                        prev.map((event) =>
                          event.outfitId === id ? { ...event, outfitId: '' } : event
                        )
                      );
                      closeModal();
                    }}
                    onAssign={() => openModal('addEvent', activeModal.data.id)}
                  />
                )}

                {activeModal?.type === 'addEvent' && (
                  <AddEventModal
                    outfits={outfits}
                    preselectedOutfitId={activeModal.data}
                    onClose={closeModal}
                    onSave={(event) => {
                      setEvents((prev) => [...prev, event]);
                      closeModal();
                    }}
                  />
                )}

                {activeModal?.type === 'upgradePrompt' && (
                  <UpgradePromptModal
                    onClose={closeModal}
                    onUpgrade={() => openModal('subscriptions')}
                  />
                )}

                {activeModal?.type === 'subscriptions' && (
                  <SubscriptionsModal
                    currentTier={user.tier}
                    onClose={closeModal}
                    onUpgrade={handleUpgrade}
                  />
                )}

                {activeModal?.type === 'aiSuggestions' && (
                  <AISuggestionsModal
                    clothes={clothes}
                    userTier={user.tier}
                    onClose={closeModal}
                    onSave={(outfit) => {
                      setOutfits((prev) => [outfit, ...prev]);
                      closeModal();
                    }}
                    onUpgrade={() => openModal('subscriptions')}
                  />
                )}

                {activeModal?.type === 'priceTracker' && (
                  <PriceTrackerModal
                    userTier={user.tier}
                    onClose={closeModal}
                    onUpgrade={() => openModal('subscriptions')}
                  />
                )}

                {activeModal?.type === 'contributors' && (
                  <ContributorsModal
                    userTier={user.tier}
                    onClose={closeModal}
                    onUpgrade={() => openModal('subscriptions')}
                  />
                )}

                {activeModal?.type === 'settings' && (
                  <SettingsModal onClose={closeModal} onLogout={handleLogout} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-16 flex-col items-center gap-1 pt-2 transition-colors ${
        isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 px-8 text-white">
      <div className="mb-5 rounded-[2rem] bg-white/10 p-6 backdrop-blur animate-bounce">
        <Shirt size={68} />
      </div>
      <h1 className="text-3xl font-black tracking-tight">Digital Wardrobe</h1>
      <p className="mt-2 text-center text-indigo-100">
        Planner, stylist, and closet organizer in one polished space.
      </p>
      <div className="mt-8 flex gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/80 animate-pulse [animation-delay:120ms]" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/60 animate-pulse [animation-delay:240ms]" />
      </div>
    </div>
  );
}

function WelcomeScreen({ onLogin }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: 'Organize every closet favorite',
      desc: 'Track essentials, plan looks, and find your go-to pieces faster.',
      icon: <Shirt size={80} className="text-indigo-500" />,
    },
    {
      title: 'Build outfits visually',
      desc: 'Assemble tops, bottoms, shoes, and accessories in a clean flow.',
      icon: <Sparkles size={80} className="text-violet-500" />,
    },
    {
      title: 'Stay ready for every event',
      desc: 'Map outfits to plans so your week is styled ahead of time.',
      icon: <CalendarIcon size={80} className="text-sky-500" />,
    },
  ];

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-8 rounded-[2rem] bg-gray-50 p-8 shadow-inner">
          {slides[slide].icon}
        </div>
        <h2 className="mb-4 text-3xl font-black text-gray-800">
          {slides[slide].title}
        </h2>
        <p className="max-w-sm text-sm leading-6 text-gray-500">
          {slides[slide].desc}
        </p>
      </div>

      <div className="mb-8 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 w-8 rounded-full transition-all ${
              index === slide ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="space-y-3 p-6">
        {slide < slides.length - 1 ? (
          <button
            onClick={() => setSlide((prev) => prev + 1)}
            className="w-full rounded-2xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="w-full rounded-2xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Get Started
          </button>
        )}
        <button
          onClick={onLogin}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

function AuthScreen({ onLogin, onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('style@demo.com');

  return (
    <div className="relative flex h-full flex-col bg-white p-6">
      <button
        onClick={onBack}
        className="absolute left-6 top-6 rounded-full bg-gray-100 p-2 text-gray-400 transition hover:bg-gray-200"
      >
        <X size={24} />
      </button>

      <div className="mt-20 flex-1">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
          Welcome to your wardrobe
        </p>
        <h1 className="mb-2 text-3xl font-black text-gray-800">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="mb-8 text-gray-500">
          {isLogin
            ? 'Login to access your wardrobe, plans, and saved looks.'
            : 'Create an account to start organizing your style.'}
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (email.trim()) onLogin(email.trim());
          }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            defaultValue="password"
            required
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-indigo-500"
          />

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm font-medium text-indigo-600">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between gap-3">
          <hr className="w-full border-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="w-full border-gray-200" />
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => onLogin('google@user.com')}
            className="w-full rounded-2xl border border-gray-200 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Continue with Google
          </button>
          <button
            onClick={() => onLogin('apple@user.com')}
            className="w-full rounded-2xl bg-black py-3.5 font-semibold text-white transition hover:bg-gray-900"
          >
            Continue with Apple
          </button>
        </div>
      </div>

      <div className="pb-8 text-center">
        <button onClick={() => setIsLogin((prev) => !prev)} className="text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span className="font-bold text-indigo-600">
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </button>
      </div>
    </div>
  );
}

function HomeScreen({ user, clothes, outfits, events, onNavigate, onOpenFeature }) {
  const tier = TIERS[user.tier];
  const usage = tier.hangers === Infinity ? 'Unlimited' : `${clothes.length}/${tier.hangers}`;
  const upcomingEvent = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-[2rem] bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-xl shadow-indigo-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">
          Good style starts here
        </p>
        <h2 className="mt-2 text-3xl font-black">Hello, {user.name}!</h2>
        <p className="mt-2 max-w-xs text-sm text-indigo-100">
          You currently have {clothes.length} wardrobe items, {outfits.length}{' '}
          saved outfits, and {events.length} planned events.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => onNavigate('outfits')}
            className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-indigo-600 shadow-sm"
          >
            Plan Outfit
          </button>
          <button
            onClick={() => onNavigate('wardrobe')}
            className="rounded-xl border border-white/30 px-4 py-2 text-sm font-bold text-white"
          >
            Open Wardrobe
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Plan" value={tier.name} accent="indigo" />
        <StatCard label="Hangers" value={usage} accent="emerald" />
        <StatCard label="Next event" value={upcomingEvent ? 'Ready' : 'None'} accent="amber" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DashboardCard
          icon={<Shirt size={24} className="text-blue-500" />}
          title="My Wardrobe"
          description="Browse all pieces"
          bg="bg-blue-50"
          onClick={() => onNavigate('wardrobe')}
        />
        <DashboardCard
          icon={<Sparkles size={24} className="text-purple-500" />}
          title="Outfit Builder"
          description="Create new looks"
          bg="bg-purple-50"
          onClick={() => onOpenFeature('buildOutfit')}
        />
        <DashboardCard
          icon={<CalendarIcon size={24} className="text-orange-500" />}
          title="Event Planner"
          description="Schedule outfits"
          bg="bg-orange-50"
          onClick={() => onNavigate('events')}
        />
        <DashboardCard
          icon={<Lock size={16} className="absolute right-3 top-3 text-indigo-400" />}
          mainIcon={<Sparkles size={24} className="text-indigo-500" />}
          title="AI Suggestions"
          description="Premium styling"
          bg="bg-indigo-50"
          onClick={() => onOpenFeature('aiSuggestions')}
        />
      </div>

      <div className="rounded-[2rem] border border-gray-100 bg-white p-4 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-800">
          <Tag size={18} /> Discover & Shop
        </h3>
        <button
          onClick={() => onOpenFeature('priceTracker')}
          className="flex w-full items-center justify-between rounded-2xl bg-gray-50 p-4 text-left transition hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <ShoppingCart size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Price Tracker</p>
              <p className="text-xs text-gray-500">
                Compare budget-friendly finds that match your style.
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  const styles = {
    indigo: 'from-indigo-500/10 to-indigo-100 text-indigo-700',
    emerald: 'from-emerald-500/10 to-emerald-100 text-emerald-700',
    amber: 'from-amber-500/10 to-amber-100 text-amber-700',
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-br p-4 ${styles[accent]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-black text-gray-800">{value}</p>
    </div>
  );
}

function DashboardCard({ icon, mainIcon, title, description, bg, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${bg} relative flex flex-col items-start gap-3 rounded-[1.5rem] p-4 text-left transition hover:opacity-90 active:scale-95`}
    >
      {icon}
      {mainIcon}
      <span className="font-semibold text-sm text-gray-800">{title}</span>
      <span className="text-xs text-gray-500">{description}</span>
    </button>
  );
}

function WardrobeScreen({ clothes, userTier, onAddClick, onItemClick }) {
  const [filter, setFilter] = useState('All');
  const tier = TIERS[userTier];
  const hangerLabel = tier.hangers === Infinity ? '∞' : tier.hangers;

  const filteredClothes = useMemo(() => {
    if (filter === 'All') return clothes;
    return clothes.filter((item) => item.category === filter);
  }, [clothes, filter]);

  return (
    <div className="relative h-full p-4">
      <div className="mb-4 flex items-center justify-between rounded-[1.5rem] border border-gray-100 bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Plan usage
          </p>
          <h2 className="text-lg font-black text-gray-900">
            {clothes.length} / {hangerLabel} hangers used
          </h2>
          <p className="text-sm text-gray-500">{tier.name} tier</p>
        </div>
        <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
          {Math.max(0, (tier.hangers === Infinity ? clothes.length : tier.hangers - clothes.length))}
          {tier.hangers === Infinity ? ' saved' : ' left'}
        </div>
      </div>

      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-4">
        {['All', ...CATEGORIES].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-indigo-600 text-white shadow-md'
                : 'border border-gray-200 bg-white text-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredClothes.length === 0 ? (
        <EmptyState
          icon={<Shirt size={32} />}
          title="Your wardrobe is ready for its first addition."
          desc="Add tops, bottoms, shoes, and accessories to start building looks."
          action="Add Clothing"
          onAction={onAddClick}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-6">
          {filteredClothes.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item)}
              className="overflow-hidden rounded-[1.25rem] border border-gray-100 bg-white text-left shadow-sm transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-gray-400">
                    <div className="rounded-full bg-white/70 p-3 shadow-sm">
                      <Shirt size={34} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                      {item.color || 'Style piece'}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1 p-3">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {item.category}
                </span>
                <h3 className="truncate text-sm font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {item.occasion} • {item.season}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={onAddClick}
        className="absolute bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

function OutfitsScreen({ outfits, onCreateClick, onOutfitClick }) {
  return (
    <div className="p-4">
      {outfits.length === 0 ? (
        <EmptyState
          icon={<Sparkles size={32} />}
          title="No outfits yet"
          desc="Combine your wardrobe items into memorable looks."
          action="Create Outfit"
          onAction={onCreateClick}
        />
      ) : (
        <div className="space-y-4">
          <button
            onClick={onCreateClick}
            className="flex w-full items-center justify-center gap-2 rounded-[1.5rem] border-2 border-dashed border-gray-300 py-4 font-medium text-gray-500 transition hover:bg-gray-50"
          >
            <Plus size={18} /> Create New Look
          </button>

          {outfits.map((outfit) => (
            <button
              key={outfit.id}
              onClick={() => onOutfitClick(outfit)}
              className="w-full rounded-[1.5rem] border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">{outfit.name}</h3>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {Object.values(outfit.items).filter(Boolean).length} items
                </span>
              </div>
              <div className="flex gap-2">
                {['top', 'bottom', 'shoes', 'accessories'].map((slot) => {
                  const item = outfit.items[slot];
                  return (
                    <div
                      key={slot}
                      className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                    >
                      {item ? (
                        item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Shirt size={20} className="text-gray-300" />
                        )
                      ) : (
                        <span className="text-[10px] capitalize text-gray-300">
                          {slot}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EventsScreen({ events, outfits, onAddClick }) {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Upcoming Events</h2>
        <button
          onClick={onAddClick}
          className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
        >
          + Add
        </button>
      </div>

      {sortedEvents.length === 0 ? (
        <EmptyState
          icon={<CalendarIcon size={32} />}
          title="No upcoming events."
          desc="Plan your week ahead and assign outfits to important moments."
          action="Add Event"
          onAction={onAddClick}
        />
      ) : (
        <div className="space-y-3">
          {sortedEvents.map((event) => {
            const outfit = outfits.find((savedOutfit) => savedOutfit.id === event.outfitId);
            const eventDate = new Date(event.date);

            return (
              <div
                key={event.id}
                className="flex items-center gap-4 rounded-[1.5rem] border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="min-w-[68px] rounded-2xl bg-indigo-50 p-2 text-center text-indigo-600">
                  <div className="text-[10px] font-bold uppercase">
                    {eventDate.toLocaleString('default', { month: 'short' })}
                  </div>
                  <div className="text-xl font-black leading-none">{eventDate.getDate()}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{event.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <Shirt size={12} /> {outfit ? outfit.name : 'No outfit assigned'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProfileScreen({ user, clothes, outfits, events, onLogout, openModal }) {
  const tier = TIERS[user.tier];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 px-6 py-12 text-center text-white">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/10 bg-white/20">
          <User size={40} />
        </div>
        <h2 className="text-2xl font-black">{user.name}</h2>
        <p className="text-sm text-indigo-200">{user.email}</p>
      </div>

      <div className="-mt-6 p-4">
        <div className="mb-6 flex items-center justify-between rounded-[1.5rem] border border-gray-100 bg-white p-5 shadow-lg">
          <div>
            <p className="mb-1 text-xs font-bold uppercase text-gray-500">Current Plan</p>
            <p className="text-lg font-black text-indigo-600">{tier.name}</p>
          </div>
          <button
            onClick={() => openModal('subscriptions')}
            className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700"
          >
            Upgrade
          </button>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <ProfileMetric label="Items" value={clothes.length} />
          <ProfileMetric label="Looks" value={outfits.length} />
          <ProfileMetric label="Events" value={events.length} />
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm">
          <ProfileRow
            icon={<Settings size={20} />}
            label="App Settings"
            onClick={() => openModal('settings')}
          />
          <ProfileRow
            icon={<Users size={20} />}
            label="Contributor Access"
            badge="Premium"
            onClick={() => openModal('contributors')}
          />
          <ProfileRow
            icon={<CreditCard size={20} />}
            label="Subscription Plans"
            onClick={() => openModal('subscriptions')}
          />
          <div className="h-px w-full bg-gray-100" />
          <ProfileRow
            icon={<LogOut size={20} />}
            label="Logout"
            onClick={onLogout}
            color="text-red-500"
          />
        </div>
      </div>
    </div>
  );
}

function ProfileMetric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
      <p className="text-2xl font-black text-gray-900">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
        {label}
      </p>
    </div>
  );
}

function ProfileRow({ icon, label, onClick, color = 'text-gray-700', badge }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between p-4 transition hover:bg-gray-50 ${color}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-700">
            {badge}
          </span>
        )}
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </button>
  );
}

function AddClothesModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[0],
    color: '',
    occasion: OCCASIONS[0],
    season: SEASONS[0],
    image: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      id: generateId(),
      ...formData,
      name: formData.name || `${formData.color || 'Styled'} ${formData.category}`,
    });
  };

  return (
    <ModalShell title="Add Clothing" onClose={onClose}>
      <form id="add-clothes-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="group relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-6 text-center">
          {formData.image ? (
            <img
              src={formData.image}
              className="absolute inset-0 h-full w-full object-cover"
              alt="Preview"
            />
          ) : (
            <>
              <div className="mb-2 rounded-full bg-white p-3 text-indigo-500 shadow-sm transition group-hover:scale-110">
                <Upload size={24} />
              </div>
              <p className="text-sm font-semibold text-indigo-900">Upload Image</p>
              <p className="mt-1 text-xs text-indigo-500">Optional but recommended</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                setFormData((prev) => ({
                  ...prev,
                  image: URL.createObjectURL(file),
                }));
              }
            }}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>

        <div className="space-y-4">
          <Input
            label="Item Name"
            placeholder="e.g. Denim Jacket"
            value={formData.name}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              options={CATEGORIES}
              value={formData.category}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, category: event.target.value }))
              }
            />
            <Input
              label="Color"
              placeholder="e.g. Blue"
              value={formData.color}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, color: event.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Occasion"
              options={OCCASIONS}
              value={formData.occasion}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, occasion: event.target.value }))
              }
            />
            <Select
              label="Season"
              options={SEASONS}
              value={formData.season}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, season: event.target.value }))
              }
            />
          </div>
        </div>
      </form>
      <div className="mt-8">
        <button
          type="submit"
          form="add-clothes-form"
          className="w-full rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
        >
          Save Item
        </button>
      </div>
    </ModalShell>
  );
}

function ItemDetailModal({ item, onClose, onDelete }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white animate-slide-in-right">
      <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-gray-100 to-gray-200">
        {item.image ? (
          <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <Shirt size={64} />
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute left-6 top-6 rounded-full bg-white/80 p-2 shadow-md backdrop-blur"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative z-10 -mt-6 flex flex-1 flex-col rounded-t-[2rem] bg-white p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              {item.category}
            </span>
            <h2 className="mt-2 text-2xl font-black text-gray-800">{item.name}</h2>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <DetailBox label="Color" value={item.color || 'N/A'} />
          <DetailBox label="Occasion" value={item.occasion} />
          <DetailBox label="Season" value={item.season} />
        </div>

        <div className="mt-auto space-y-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3.5 font-bold text-gray-800">
            <Edit2 size={18} /> Edit Details
          </button>
          <button
            onClick={() => window.confirm('Delete this item?') && onDelete(item.id)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3.5 font-bold text-red-600"
          >
            <Trash2 size={18} /> Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

function OutfitBuilderModal({ clothes, onClose, onSave }) {
  const [name, setName] = useState('');
  const [slots, setSlots] = useState({
    top: null,
    bottom: null,
    shoes: null,
    accessories: null,
  });
  const [activeSlot, setActiveSlot] = useState(null);

  const slotItems = clothes.filter((item) => {
    if (!activeSlot) return true;
    if (activeSlot === 'top') return item.category === 'Top';
    if (activeSlot === 'bottom') return item.category === 'Bottom' || item.category === 'Dress';
    if (activeSlot === 'shoes') return item.category === 'Shoes';
    if (activeSlot === 'accessories') return item.category === 'Accessories';
    return true;
  });

  const handleSelect = (item) => {
    setSlots((prev) => ({ ...prev, [activeSlot]: item }));
    setActiveSlot(null);
  };

  const handleSave = () => {
    if (!slots.top && !slots.bottom && !slots.shoes && !slots.accessories) {
      alert('Select at least one item!');
      return;
    }

    onSave({
      id: generateId(),
      name: name || 'My New Look',
      items: slots,
    });
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-gray-50 animate-slide-in-right">
      <div className="flex items-center justify-between border-b bg-white p-4 shadow-sm">
        <h2 className="text-lg font-bold">Build Outfit</h2>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      {!activeSlot ? (
        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <input
            type="text"
            placeholder="Name this look (Optional)"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mb-6 w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-center font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <OutfitSlot
              label="Top"
              item={slots.top}
              onClick={() => setActiveSlot('top')}
            />
            <OutfitSlot
              label="Bottom"
              item={slots.bottom}
              onClick={() => setActiveSlot('bottom')}
            />
            <div className="flex w-full justify-center gap-4">
              <OutfitSlot
                label="Shoes"
                item={slots.shoes}
                onClick={() => setActiveSlot('shoes')}
                small
              />
              <OutfitSlot
                label="Accessories"
                item={slots.accessories}
                onClick={() => setActiveSlot('accessories')}
                small
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-8 w-full rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200"
          >
            Save Outfit
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-white p-4">
          <h3 className="mb-4 text-lg font-bold capitalize">Select {activeSlot}</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                setSlots((prev) => ({ ...prev, [activeSlot]: null }));
                setActiveSlot(null);
              }}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-xs font-bold text-gray-500"
            >
              Clear
            </button>
            {slotItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="aspect-square overflow-hidden rounded-xl bg-gray-100"
              >
                {item.image ? (
                  <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Shirt size={24} className="text-gray-300" />
                  </div>
                )}
              </button>
            ))}
          </div>
          {slotItems.length === 0 && (
            <p className="mt-6 text-sm text-gray-500">
              Add matching clothing items to your wardrobe to fill this slot.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function OutfitSlot({ label, item, onClick, small }) {
  return (
    <button
      onClick={onClick}
      className={`${small ? 'h-24 w-24' : 'h-40 w-40'} relative flex items-center justify-center overflow-hidden rounded-[1.5rem] border-2 border-dashed transition-all ${
        item
          ? 'border-indigo-500 bg-white'
          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
      }`}
    >
      {item ? (
        <>
          {item.image ? (
            <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
          ) : (
            <Shirt size={32} className="text-indigo-200" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
            <span className="text-xs font-bold text-white">Change</span>
          </div>
        </>
      ) : (
        <span className="flex flex-col items-center gap-1 text-sm font-semibold text-gray-400">
          <Plus size={16} /> {label}
        </span>
      )}
    </button>
  );
}

function OutfitDetailModal({ outfit, onClose, onDelete, onAssign }) {
  const slots = [
    ['Top', outfit.items.top],
    ['Bottom', outfit.items.bottom],
    ['Shoes', outfit.items.shoes],
    ['Accessories', outfit.items.accessories],
  ];

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white animate-slide-in-right">
      <div className="flex items-center justify-between border-b p-4 shadow-sm">
        <h2 className="text-lg font-bold">{outfit.name}</h2>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="mb-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            {slots.map(([label, item]) => (
              <div key={label} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  {label}
                </p>
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-white">
                  {item?.image ? (
                    <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
                  ) : item ? (
                    <Shirt size={30} className="text-gray-300" />
                  ) : (
                    <span className="text-xs font-semibold text-gray-300">Empty slot</span>
                  )}
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-700">
                  {item?.name || 'Not selected'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onAssign}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-white"
          >
            <CalendarIcon size={18} /> Assign to Event
          </button>
          <button
            onClick={() => window.confirm('Delete this outfit?') && onDelete(outfit.id)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3.5 font-bold text-red-600"
          >
            <Trash2 size={18} /> Delete Outfit
          </button>
        </div>
      </div>
    </div>
  );
}

function AddEventModal({ outfits, preselectedOutfitId, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    outfitId: preselectedOutfitId || '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ id: generateId(), ...formData });
  };

  return (
    <ModalShell title="Plan Event" onClose={onClose}>
      <form id="event-form" onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Event Name"
          placeholder="e.g. Wedding, Date Night"
          required
          value={formData.title}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, title: event.target.value }))
          }
        />
        <Input
          label="Date"
          type="date"
          required
          value={formData.date}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, date: event.target.value }))
          }
        />
        <Select
          label="Select Outfit"
          options={outfits.map((outfit) => ({ label: outfit.name, value: outfit.id }))}
          value={formData.outfitId}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, outfitId: event.target.value }))
          }
          emptyOption="No outfit assigned yet"
        />
      </form>
      <div className="mt-8">
        <button
          type="submit"
          form="event-form"
          className="w-full rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200"
        >
          Save Event
        </button>
      </div>
    </ModalShell>
  );
}

function AISuggestionsModal({ clothes, userTier, onClose, onSave, onUpgrade }) {
  if (['free', 'starter'].includes(userTier)) {
    return (
      <PremiumGate
        feature="AI Style Suggestions"
        onUpgrade={onUpgrade}
        onClose={onClose}
      />
    );
  }

  const top = clothes.find((item) => item.category === 'Top');
  const bottom = clothes.find(
    (item) => item.category === 'Bottom' || item.category === 'Dress'
  );
  const hasEnoughClothes = Boolean(top && bottom);

  return (
    <ModalShell title="AI Stylist" onClose={onClose}>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-600">
          <Sparkles size={40} />
        </div>

        {!hasEnoughClothes ? (
          <p className="text-gray-500">
            Add at least one top and one bottom to unlock tailored AI outfit
            suggestions.
          </p>
        ) : (
          <>
            <h3 className="mb-2 text-xl font-bold text-gray-800">Recommended Look</h3>
            <p className="mb-8 text-sm text-gray-500">
              Based on your wardrobe and smart mix-and-match styling.
            </p>

            <div className="mb-8 flex w-full flex-col items-center gap-4 rounded-[2rem] border border-gray-100 bg-gray-50 p-6 shadow-inner">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md">
                {top.image ? (
                  <img src={top.image} className="h-full w-full object-cover" alt={top.name} />
                ) : (
                  <Shirt size={28} className="text-gray-300" />
                )}
              </div>
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md">
                {bottom.image ? (
                  <img
                    src={bottom.image}
                    className="h-full w-full object-cover"
                    alt={bottom.name}
                  />
                ) : (
                  <Shirt size={28} className="text-gray-300" />
                )}
              </div>
              <p className="mt-2 font-semibold text-gray-700">
                “{top.color || 'Neutral'} Top + {bottom.color || 'Classic'} Bottom”
              </p>
            </div>

            <button
              onClick={() =>
                onSave({
                  id: generateId(),
                  name: 'AI Suggestion',
                  items: {
                    top,
                    bottom,
                    shoes: null,
                    accessories: null,
                  },
                })
              }
              className="w-full rounded-xl bg-purple-600 py-4 font-bold text-white shadow-lg shadow-purple-200"
            >
              Save this Outfit
            </button>
          </>
        )}
      </div>
    </ModalShell>
  );
}

function PriceTrackerModal({ userTier, onClose, onUpgrade }) {
  if (['free', 'starter'].includes(userTier)) {
    return <PremiumGate feature="Price Tracker" onUpgrade={onUpgrade} onClose={onClose} />;
  }

  const dummyDeals = [
    { title: 'Classic Denim Jacket', price: '$45.00', old: '$80.00', store: 'Zara' },
    { title: 'White Sneakers', price: '$60.00', old: '$110.00', store: 'Nike' },
  ];

  return (
    <ModalShell title="Price Tracker" onClose={onClose}>
      <div className="mb-6 rounded-xl border border-green-100 bg-green-50 p-4">
        <p className="text-sm font-medium text-green-800">
          We found new deals matching your style profile.
        </p>
      </div>
      <div className="space-y-4">
        {dummyDeals.map((deal) => (
          <div key={deal.title} className="flex gap-4 rounded-[1.5rem] border border-gray-100 p-4 shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
              <Tag size={24} />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase text-gray-400">{deal.store}</span>
              <h4 className="mb-2 font-bold leading-tight text-gray-800">{deal.title}</h4>
              <div className="flex items-center gap-2">
                <span className="font-black text-green-600">{deal.price}</span>
                <span className="text-xs text-gray-400 line-through">{deal.old}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}

function ContributorsModal({ userTier, onClose, onUpgrade }) {
  if (userTier !== 'premium') {
    return (
      <PremiumGate
        feature="Contributor Access"
        onUpgrade={onUpgrade}
        onClose={onClose}
      />
    );
  }

  return (
    <ModalShell title="Contributors" onClose={onClose}>
      <p className="mb-6 text-sm text-gray-500">
        Invite friends or stylists to review your wardrobe and suggest outfits.
      </p>
      <div className="mb-8 flex gap-2">
        <input
          type="email"
          placeholder="Email address"
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500"
        />
        <button className="rounded-xl bg-indigo-600 px-6 font-bold text-white">Invite</button>
      </div>
      <h4 className="mb-4 font-bold text-gray-800">Active Contributors</h4>
      <div className="rounded-[1.5rem] border border-gray-100 bg-gray-50 py-8 text-center">
        <Users size={32} className="mx-auto mb-2 text-gray-300" />
        <p className="text-sm text-gray-500">No contributors yet.</p>
      </div>
    </ModalShell>
  );
}

function SubscriptionsModal({ currentTier, onClose, onUpgrade }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-gray-50 animate-slide-in-right">
      <div className="flex items-center justify-between border-b bg-white p-4 shadow-sm">
        <h2 className="text-lg font-bold">Upgrade Plan</h2>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4 pb-12">
        {Object.values(TIERS).map((tier) => {
          const isCurrent = tier.id === currentTier;
          return (
            <div
              key={tier.id}
              className={`relative overflow-hidden rounded-[2rem] border-2 bg-white p-6 transition-all ${
                isCurrent ? 'border-indigo-600 shadow-md' : 'border-gray-100'
              }`}
            >
              {isCurrent && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  Current
                </div>
              )}
              <h3 className="text-xl font-black text-gray-800">{tier.name}</h3>
              <div className="my-2 text-3xl font-black text-indigo-600">
                {tier.price}
                <span className="text-sm font-medium text-gray-400">/month</span>
              </div>
              <ul className="my-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                    <div className="rounded-full bg-green-100 p-1 text-green-600">
                      <Check size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                disabled={isCurrent}
                onClick={() => onUpgrade(tier.id)}
                className={`w-full rounded-xl py-3.5 text-sm font-bold transition-colors ${
                  isCurrent
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700'
                }`}
              >
                {isCurrent ? 'Active Plan' : `Upgrade to ${tier.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsModal({ onClose, onLogout }) {
  return (
    <ModalShell title="Settings" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-800">
            Preferences
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
              <span className="text-sm font-medium">Push Notifications</span>
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-indigo-600" />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
              <span className="text-sm font-medium">Dark Mode</span>
              <input type="checkbox" className="h-5 w-5 accent-indigo-600" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
            Danger Zone
          </h4>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to log out and clear the demo session?')) {
                onLogout();
              }
            }}
            className="w-full rounded-xl p-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function UpgradePromptModal({ onClose, onUpgrade }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-8 text-center shadow-2xl animate-slide-up">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
          <Lock size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-black text-gray-800">Hanger Limit Reached</h2>
        <p className="mb-8 text-gray-500">
          You have reached the maximum number of items for your current plan.
          Upgrade to store more clothing.
        </p>
        <div className="space-y-3">
          <button
            onClick={onUpgrade}
            className="w-full rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200"
          >
            View Plans
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-gray-100 py-4 font-bold text-gray-600"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

function PremiumGate({ feature, onUpgrade, onClose }) {
  return (
    <ModalShell title={feature} onClose={onClose}>
      <div className="py-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
          <Lock size={40} />
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-800">
          {feature} is a Premium feature.
        </h3>
        <p className="mb-8 text-gray-500">
          Upgrade your plan to unlock AI suggestions, price tracking, and more.
        </p>
        <button
          onClick={onUpgrade}
          className="w-full rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200"
        >
          Upgrade Now
        </button>
      </div>
    </ModalShell>
  );
}

function ModalShell({ title, children, onClose }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end bg-black/50 sm:items-center sm:justify-center">
      <div className="flex h-[90%] w-full flex-col rounded-t-[2rem] bg-white shadow-2xl animate-slide-up sm:h-auto sm:max-h-[90%] sm:w-[90%] sm:rounded-[2rem] sm:animate-none">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
        {label}
      </label>
      <input
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
    </div>
  );
}

function Select({ label, options, emptyOption, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
        {label}
      </label>
      <select
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      >
        {emptyOption && <option value="">{emptyOption}</option>}
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const labelText = typeof option === 'string' ? option : option.label;

          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        {label}
      </span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function EmptyState({ icon, title, desc, action, onAction }) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
      <p className="mb-8 text-sm text-gray-500">{desc}</p>
      {action && (
        <button
          onClick={onAction}
          className="rounded-xl bg-indigo-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
        >
          {action}
        </button>
      )}
    </div>
  );
}
