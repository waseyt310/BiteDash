import { ArrowRight, Star, Clock, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { getFoodRecommendations } from '../lib/gemini';

const CATEGORIES = [
  { name: 'Burger', icon: '🍔', color: 'bg-orange-100' },
  { name: 'Pizza', icon: '🍕', color: 'bg-red-100' },
  { name: 'Sushi', icon: '🍣', color: 'bg-green-100' },
  { name: 'Bakery', icon: '🥐', color: 'bg-yellow-100' },
  { name: 'Healthy', icon: '🥗', color: 'bg-emerald-100' },
  { name: 'Drinks', icon: '🥤', color: 'bg-blue-100' },
];

const FEATURED_STORES = [
  {
    id: '1',
    name: 'Burger King',
    rating: 4.5,
    time: '20-30 min',
    fee: '$0.99',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800',
    category: 'Fast Food',
  },
  {
    id: '2',
    name: 'Pizza Hut',
    rating: 4.2,
    time: '15-25 min',
    fee: 'Free',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    category: 'Italian',
  },
  {
    id: '3',
    name: 'Starbucks',
    rating: 4.8,
    time: '10-20 min',
    fee: '$2.99',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    category: 'Cafe',
  },
];

export default function Home() {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    getFoodRecommendations(['Double Cheeseburger', 'Pepperoni Pizza'], 'Loves spicy food')
      .then(setRecommendations);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between py-12 border-b border-white/10">
        <div className="max-w-2xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-serif italic leading-none md:text-8xl text-white"
          >
            The Curator's <br />
            List.
          </motion.h1>
          <p className="text-sm opacity-50 font-light leading-relaxed max-w-md">
            Our editors' selection of the finest culinary experiences available for immediate delivery to your doorstep.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/restaurants"
            className="border border-white/20 px-8 py-3 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all"
          >
            Refine Search
          </Link>
        </div>
      </section>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <Sparkles className="text-editorial-gold" size={20} />
            <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Personalized For You</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group border border-white/10 p-8 hover:border-white/40 transition-colors bg-editorial-dark"
              >
                <div className="mb-4 font-serif italic text-2xl text-white group-hover:text-editorial-gold transition-colors">{rec.dish}</div>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">{rec.reason}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Stores */}
      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Trending Nearby</h2>
          <Link to="/restaurants" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-100 opacity-60">
            View All
          </Link>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          {FEATURED_STORES.slice(0, 2).map((store, i) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="group flex flex-col gap-6"
            >
              <Link to={`/restaurant/${store.id}`} className="block overflow-hidden relative aspect-[16/9]">
                <img
                  src={store.image}
                  alt={store.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-white text-black px-2 py-0.5 text-[9px] uppercase font-bold tracking-tighter mb-2 inline-block">
                    {i === 0 ? "Editor's Choice" : "Trending Nearby"}
                  </span>
                  <h2 className="text-3xl font-serif italic text-white">{store.name}</h2>
                  <p className="text-[9px] opacity-60 uppercase tracking-[0.2em] mt-1">
                    {store.category} • {store.time} • {store.rating} ★
                  </p>
                </div>
              </Link>
              <p className="text-sm font-light leading-relaxed opacity-50 px-2 line-clamp-2">
                A curated selection of seasonal ingredients and handcrafted dishes delivered with absolute precision.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Bar */}
      <section className="border-t border-white/10 pt-16 flex flex-wrap justify-between gap-8">
        <div className="max-w-xs space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Cuisines</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat.name} className="px-4 py-1 border border-white/10 rounded-full text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-editorial-dark border border-white/10 p-6 max-w-sm flex-1">
          <p className="text-xs font-serif italic mb-2 text-white">Join Noir.</p>
          <p className="text-[10px] leading-relaxed opacity-40 mb-4">Zero delivery fees on all orders from curated boutiques.</p>
          <button className="w-full py-3 bg-white text-black text-[10px] uppercase font-bold tracking-widest hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>
      </section>
    </div>
  );
}
