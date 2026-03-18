export const TIERS = {
  free: {
    id: 'free',
    name: 'Free',
    price: '$0',
    hangers: 5,
    features: ['5 Hangers', 'Basic Outfits', 'Manual Events'],
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    price: '$5',
    hangers: 20,
    features: ['20 Hangers', 'Basic Outfits', 'Event Planner'],
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    price: '$10',
    hangers: 50,
    features: ['50 Hangers', 'AI Recommendations', 'Price Tracker'],
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: '$20',
    hangers: Infinity,
    features: ['Unlimited Hangers', 'All Features', 'Contributor Access'],
  },
};

export const CATEGORIES = ['Top', 'Bottom', 'Dress', 'Shoes', 'Accessories'];
export const OCCASIONS = ['Casual', 'Work', 'Party', 'Wedding', 'Gym'];
export const SEASONS = ['Summer', 'Winter', 'Spring', 'Fall', 'All Season'];
