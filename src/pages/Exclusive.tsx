import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ExclusiveDeal } from '../types/store';
import { SAMPLE_EXCLUSIVES } from '../lib/sampleData';
import ExclusiveCard from '../components/exclusive/ExclusiveCard';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Crown, ArrowRight, ShieldCheck, Zap, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Exclusive() {
  const [exclusives, setExclusives] = useState<ExclusiveDeal[]>(SAMPLE_EXCLUSIVES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExclusives = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, 'exclusives'), orderBy('rating', 'desc')));
        if (!snapshot.empty) {
          setExclusives(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExclusiveDeal)));
        }
      } catch (error) {
        console.error('Error fetching exclusives:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExclusives();
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Header */}
      <section className="relative h-[60vh] flex flex-col justify-end pb-12 border-b border-white/5">
        <div className="absolute inset-0 -top-40 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-editorial-gold/10 via-transparent to-editorial-black" />
          <motion.div 
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-editorial-gold/20 rounded-full blur-[120px] -mr-400 -mt-400" 
          />
        </div>

        <div className="relative space-y-8 max-w-4xl">
          <div className="flex items-center gap-4 text-editorial-gold">
            <Trophy size={20} />
            <span className="text-[10px] uppercase tracking-[0.6em] font-black">Noir Exclusive</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-serif italic text-white tracking-tighter leading-[0.8] mix-blend-difference"
          >
            The Rare <br />
            Collections.
          </motion.h1>
          
          <p className="text-sm font-light text-white/50 leading-relaxed max-w-xl">
            A meticulously curated selection of imported delicacies, limited-batch releases, and premium ingredients reserved for the discerning palate.
          </p>
        </div>
      </section>

      {/* Featured Exclusive Deals */}
      <section className="space-y-16">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30">Featured Collections</h2>
            <div className="text-3xl font-serif italic text-white">Daily Curated Exclusives</div>
          </div>
          <div className="flex items-center gap-8">
             <div className="text-[10px] uppercase tracking-widest font-bold text-white/40 flex items-center gap-2">
                <Clock size={12} /> Updating in 4h 12m
             </div>
          </div>
        </div>

        <div className="space-y-12">
          {loading ? (
            <div className="space-y-12">
              {[1, 2].map(i => (
                <div key={i} className="h-96 w-full bg-white/5 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : (
            exclusives.map((deal, i) => (
              <ExclusiveCard key={deal.id} deal={deal} />
            ))
          )}
        </div>
      </section>

      {/* VIP Tier Section */}
      <section className="grid md:grid-cols-2 gap-12 bg-editorial-dark border border-white/5 p-12 md:p-24 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-editorial-gold/5 rounded-full blur-[100px] translate-x-48 -translate-y-48 group-hover:bg-editorial-gold/10 transition-colors duration-1000" />
        
        <div className="space-y-10 relative z-10">
          <div className="flex items-center gap-3">
             <Crown className="text-editorial-gold" size={24} />
             <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white">Noir Membership</h3>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl font-serif italic text-white leading-tight">Elevate Your <br /> Culinary Journey.</h2>
            <p className="text-sm font-light text-white/50 leading-relaxed max-w-md">
              Unlock the full potential of BiteDash with Noir. Experience priority access to the Exclusive collection, zero delivery fees, and dedicated concierge support.
            </p>
          </div>

          <ul className="space-y-4 text-[10px] uppercase tracking-widest font-bold text-white/60">
            <li className="flex items-center gap-3"><ShieldCheck size={14} className="text-editorial-gold" /> Guaranteed Same-Day Priority</li>
            <li className="flex items-center gap-3"><ShieldCheck size={14} className="text-editorial-gold" /> Exclusive Concierge Access</li>
            <li className="flex items-center gap-3"><ShieldCheck size={14} className="text-editorial-gold" /> VIP-Only Flash Deals</li>
            <li className="flex items-center gap-3"><ShieldCheck size={14} className="text-editorial-gold" /> Early Access to Limited Drops</li>
          </ul>

          <button className="px-12 py-5 bg-editorial-gold text-white text-[10px] uppercase font-black tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-editorial-gold/20">
            Join Noir Membership
          </button>
        </div>

        <div className="relative hidden md:block">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-8 rotate-3 hover:rotate-0 transition-transform duration-700">
                 <div className="h-full border border-white/5 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                       <Crown size={32} className="text-editorial-gold/40" />
                       <div className="text-[9px] uppercase tracking-tighter opacity-20 text-right">Noir Member <br /> Since 2024</div>
                    </div>
                    <div>
                       <div className="text-xs uppercase tracking-[0.4em] mb-2 text-editorial-gold">Premium Member</div>
                       <div className="text-4xl font-serif italic text-white">Discerning Palate</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* AI Trending Section */}
      <section className="space-y-16">
        <div className="flex items-center gap-3">
          <Sparkles className="text-editorial-gold" size={20} />
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30">AI Insights & Trends</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { label: 'Rising Interest', title: 'Japanese Street Food', reason: 'Interest in authentic matcha and mochi is up 240% this month across premium boutiques.', icon: <ArrowRight size={14}/> },
            { label: 'Wine Pairing', title: 'Vintage Cellar Collection', reason: 'New arrivals from Bordeaux are trending for weekend evening orders. View curated pairings.', icon: <ArrowRight size={14}/> },
            { label: 'Flash Update', title: 'The Wagyu Drop', reason: 'High demand detected in your area. Restocking for Exclusive VIPs at 5:00 PM Tomorrow.', icon: <Zap size={14} fill="currentColor"/> },
          ].map((item, i) => (
            <div key={i} className="group p-10 border border-white/5 bg-editorial-dark hover:border-editorial-gold/30 transition-all flex flex-col justify-between h-full">
              <div className="space-y-4">
                 <div className="text-[9px] uppercase tracking-widest text-editorial-gold font-bold">{item.label}</div>
                 <h4 className="text-2xl font-serif italic text-white group-hover:text-editorial-gold transition-colors">{item.title}</h4>
                 <p className="text-[11px] font-light text-white/40 leading-relaxed">{item.reason}</p>
              </div>
              <button className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-white hover:text-editorial-gold transition-colors">
                Explore Trend {item.icon}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
