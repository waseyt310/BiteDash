import { useParams } from 'react-router-dom';
import { Star, Clock, ShoppingCart, Plus, Minus, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

const MOCK_MENU = [
  { id: 'm1', name: 'Original Burger', description: 'Flame-grilled beef patty with fresh lettuce and tomato', price: 9.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400' },
  { id: 'm2', name: 'Cheese Pizza', description: 'Mozzarella, tomato sauce, and fresh basil', price: 12.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' },
  { id: 'm3', name: 'Crunchy Sushi', description: 'Tempura shrimp, avocado, and spicy mayo', price: 14.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400' },
];

export default function RestaurantDetails() {
  const { id } = useParams();
  const { items, addToCart, updateQuantity } = useCart();

  const getItemQuantity = (itemId: string) => {
    return items.find((i) => i.id === itemId)?.quantity || 0;
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"
          alt="Restaurant"
          className="h-full w-full object-cover grayscale opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-black to-transparent" />
        <div className="absolute bottom-12 left-0 right-0 text-center">
          <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-editorial-gold mb-4">
            <Star size={12} className="fill-editorial-gold" />
            <span>4.8 Excellence • 500+ Reviews</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif italic text-white tracking-tight">McBite Burgers.</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 mt-6 font-bold">Fast Food • 25 - 35 Min Delivery</p>
        </div>
      </div>

      <div className="grid gap-16 lg:grid-cols-4 px-4 pb-20">
        {/* Intro */}
        <aside className="space-y-10 lg:sticky lg:top-24 h-fit">
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-6 font-bold">Provenance</h3>
            <p className="text-xs leading-relaxed opacity-60 font-light">
              Crafted with premium flame-grilled patties and artisanal brioche, McBite redefines the minimalist burger experience.
            </p>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-6 font-bold">The Cellar</h3>
            <div className="flex flex-wrap gap-2">
              {['Burgers', 'Artisan Fries', 'Craft Shakes'].map(tag => (
                <span key={tag} className="px-3 py-1 border border-white/10 rounded-full text-[9px] uppercase tracking-widest opacity-60">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 text-white/40">
              <Info size={16} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Min. Order $15.00</span>
            </div>
          </div>
        </aside>

        {/* Menu */}
        <div className="lg:col-span-3 space-y-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-serif italic text-white">Popular Selections</h2>
          </div>

          <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
            {MOCK_MENU.map((item) => {
              const qty = getItemQuantity(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  className="group flex flex-col gap-6"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-editorial-dark border border-white/5">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                       <button
                        onClick={() => addToCart({ ...item, restaurantId: id!, quantity: 1 })}
                        className="bg-white text-black px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-editorial-gold hover:text-white transition-colors"
                      >
                        Add to Curated Order
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif text-white">{item.name}</h3>
                      <div className="text-sm font-black text-editorial-gold">${item.price}</div>
                    </div>
                    <p className="text-[11px] text-white/40 font-light leading-relaxed">{item.description}</p>
                    
                    {qty > 0 && (
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-4 border border-white/10 px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-white/40 hover:text-white"><Minus size={12} /></button>
                          <span className="text-xs font-bold w-4 text-center">{qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-white/40 hover:text-white"><Plus size={12} /></button>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-editorial-gold font-bold">In your selection</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
