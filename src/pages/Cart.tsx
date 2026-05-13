import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-10 py-32 border border-white/5 bg-editorial-dark">
        <div className="flex h-24 w-24 items-center justify-center border border-white/10 text-white/20">
          <ShoppingBag size={32} />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif italic text-white">Your selection is empty.</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Awaiting your curation</p>
        </div>
        <Link
          to="/restaurants"
          className="border border-white/20 px-10 py-3 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all"
        >
          Explore Boutiques
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-16 pb-20">
      <header className="border-b border-white/10 pb-8">
        <h1 className="text-5xl font-serif italic text-white mb-2">The Collection</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold tracking-widest">Selected Items for Immediate Transit</p>
      </header>
      
      <div className="grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-12">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-8 border-b border-white/5 pb-8 group"
              >
                <div className="h-32 w-32 shrink-0 bg-editorial-dark overflow-hidden border border-white/10">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif text-white">{item.name}</h3>
                      <p className="text-[9px] uppercase tracking-widest opacity-30 font-bold">From the boutique selection</p>
                    </div>
                    <p className="text-sm font-black text-editorial-gold">${item.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-6 border border-white/10 px-4 py-1.5 h-fit">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-white/40 hover:text-white transition-colors"><Minus size={12} /></button>
                      <span className="text-[10px] font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-white/40 hover:text-white transition-colors"><Plus size={12} /></button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[9px] uppercase tracking-widest opacity-20 hover:opacity-100 hover:text-red-400 transition-all font-bold"
                    >
                      Relinquish Item
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 border border-white/10 p-10 bg-editorial-dark">
            <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold mb-10 pb-4 border-b border-white/5">Order Assessment</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">
                <span>Value of Selection</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">
                <span>Logistics Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">
                <span>Acquisition Fee</span>
                <span>$1.50</span>
              </div>
              <div className="border-t border-white/5 pt-8 mt-6 flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Final Total</span>
                <span className="text-2xl font-serif italic text-white">${(total + 2.99 + 1.50).toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="mt-12 flex w-full items-center justify-center gap-3 bg-white py-4 text-[10px] uppercase font-bold tracking-[0.3em] text-black hover:bg-editorial-gold hover:text-white transition-all group"
            >
              Begin Secure Transit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
