import { Star, Clock, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { ExclusiveDeal } from '../../types/store';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ExclusiveCard({ deal }: { deal: ExclusiveDeal, key?: any }) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = deal.endsAt - now;
      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(timer);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deal.endsAt]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-black/40 border border-white/5 overflow-hidden ring-1 ring-white/5 hover:ring-editorial-gold/50 transition-all duration-700"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section */}
        <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden">
          <img
            src={deal.image}
            alt={deal.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800';
            }}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-editorial-gold text-white text-[9px] font-black px-3 py-1 uppercase tracking-tighter shadow-xl">
              {deal.badge || 'EXCLUSIVE'}
            </span>
            {deal.isVipOnly && (
              <span className="bg-white text-black text-[9px] font-black px-3 py-1 uppercase tracking-tighter flex items-center gap-1">
                <ShieldCheck size={10} /> VIP ACCESS
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-editorial-gold">
              <span>{deal.category}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1">
                <Star size={10} fill="currentColor" />
                <span>{deal.rating} ({deal.reviews} Reviews)</span>
              </div>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight leading-none group-hover:text-editorial-gold transition-colors">
              {deal.title}
            </h3>
            
            <p className="text-sm font-light text-white/50 leading-relaxed max-w-md">
              {deal.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <div className="space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Ends In</div>
              <div className="text-sm font-mono text-white flex items-center gap-2">
                <Clock size={14} className="text-editorial-gold" />
                {timeLeft}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Offer</div>
              <div className="text-2xl font-bold text-white leading-none">
                UP TO {deal.discount}% OFF
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-6">
            <Link
              to="/restaurants"
              className="px-10 py-4 bg-white text-black text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-editorial-gold hover:text-white transition-all flex items-center gap-3 group/btn"
            >
              Order Now <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
            
            {deal.limitedStock && (
              <div className="flex items-center gap-2 text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse">
                <Zap size={14} fill="currentColor" /> Limited Stock Available
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-editorial-gold/5 rounded-full blur-3xl pointer-events-none group-hover:bg-editorial-gold/10 transition-all duration-700" />
    </motion.div>
  );
}
