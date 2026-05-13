import { Search, SlidersHorizontal, Star, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const ALL_STORES = [
  { id: '1', name: 'Burger King', rating: 4.5, time: '20-30 min', fee: '$0.99', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800', category: 'Fast Food' },
  { id: '2', name: 'Pizza Hut', rating: 4.2, time: '15-25 min', fee: 'Free', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800', category: 'Italian' },
  { id: '3', name: 'Starbucks', rating: 4.8, time: '10-20 min', fee: '$2.99', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', category: 'Cafe' },
  { id: '4', name: 'Sushi Zen', rating: 4.7, time: '30-45 min', fee: '$3.50', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800', category: 'Japanese' },
  { id: '5', name: 'Taco Bell', rating: 4.0, time: '15-20 min', fee: '$0.50', image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=800', category: 'Mexican' },
  { id: '6', name: 'Salad Works', rating: 4.4, time: '20-35 min', fee: 'Free', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', category: 'Healthy' },
];

export default function RestaurantList() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
        <div>
          <h1 className="text-5xl font-serif italic text-white mb-2">Boutiques & Kitchens</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-medium">Curated selection for your palate</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
            <input
              type="text"
              placeholder="Search by cuisine..."
              className="w-full md:w-64 rounded-full border border-white/10 bg-editorial-dark py-2 pl-9 pr-4 text-xs text-white outline-none focus:border-white/40"
            />
          </div>
          <button className="flex items-center gap-2 border border-white/10 px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all">
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>
      </div>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_STORES.map((store, i) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group flex flex-col gap-4"
          >
            <Link to={`/restaurant/${store.id}`} className="block relative aspect-[4/3] overflow-hidden">
              <img
                src={store.image}
                alt={store.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              <div className="absolute top-4 left-4">
                 <span className="bg-white text-black px-2 py-0.5 text-[8px] uppercase font-black tracking-widest">
                  {store.category}
                </span>
              </div>
            </Link>
            <div className="space-y-2 px-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif italic text-white group-hover:text-editorial-gold transition-colors">
                  {store.name}
                </h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-white/60">
                  <Star className="text-editorial-gold" size={12} />
                  {store.rating}
                </div>
              </div>
              <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest text-white/40 font-bold">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {store.time}
                </div>
                <span>•</span>
                <div className={store.fee === 'Free' ? 'text-editorial-gold' : ''}>
                  {store.fee === 'Free' ? 'Complimentary Delivery' : `${store.fee} delivery`}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
