import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CheckCircle2, Clock, MapPin, Phone, MessageSquare, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

const STATUS_STEPS = [
  { key: 'pending', label: 'Order Registered', icon: Clock },
  { key: 'accepted', label: 'Kitchen Response', icon: CheckCircle2 },
  { key: 'preparing', label: 'Culinary Stage', icon: Clock },
  { key: 'ready', label: 'Awaiting Departure', icon: CheckCircle2 },
  { key: 'on_the_way', label: 'Transit Sequence', icon: MapPin },
  { key: 'delivered', label: 'Final Delivery', icon: CheckCircle2 },
];

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // Real-time listener for order status
    const unsubscribe = onSnapshot(doc(db, 'orders', id), (doc) => {
      setOrder(doc.data());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center font-serif italic text-white/40">Synchronizing...</div>;
  if (!order) return <div className="text-center py-20 font-serif italic">The requested ledger entry was not found.</div>;

  const currentStatusIndex = STATUS_STEPS.findIndex(s => s.key === order.status);

  return (
    <div className="mx-auto max-w-5xl space-y-16 pb-20">
      <header className="flex items-end justify-between border-b border-white/10 pb-8">
        <div>
          <h1 className="text-5xl font-serif italic text-white mb-2">Order Ledger</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold tracking-widest">Entry ID: #{id?.slice(-8).toUpperCase()}</p>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-editorial-gold border border-editorial-gold px-4 py-1">
          Est. Arrival: 15:45
        </div>
      </header>

      <div className="grid gap-16 lg:grid-cols-5">
        {/* Progress Tracker */}
        <div className="lg:col-span-3 space-y-16">
          <section className="bg-editorial-dark border border-white/10 p-12">
            <div className="relative flex flex-col gap-12">
              {STATUS_STEPS.map((step, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isActive = index === currentStatusIndex;
                
                return (
                  <div key={step.key} className="flex items-start gap-8">
                    <div className="relative z-10 flex flex-col items-center">
                      <motion.div
                        initial={false}
                        animate={{ 
                          scale: isActive ? 1.1 : 1,
                          borderColor: isCompleted ? '#C5A059' : '#1A1A1A',
                          backgroundColor: isCompleted ? '#C5A059' : 'transparent',
                        }}
                        className="flex h-8 w-8 items-center justify-center border transition-all"
                      >
                        <step.icon size={12} className={isCompleted ? 'text-white' : 'text-white/20'} />
                      </motion.div>
                      {index < STATUS_STEPS.length - 1 && (
                        <div className={`h-16 w-[1px] ${isCompleted ? 'bg-editorial-gold' : 'bg-white/5'}`} />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isCompleted ? 'text-white' : 'text-white/20'}`}>
                        {step.label}
                      </p>
                      {isActive && (
                        <p className="text-[9px] font-serif italic text-editorial-gold mt-1 animate-pulse">Live Status</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Map Placeholder */}
          <section className="relative h-80 w-full overflow-hidden bg-editorial-dark border border-white/5 group">
             <div className="absolute inset-0 opacity-10 bg-center grayscale pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center group-hover:scale-110 transition-transform duration-1000">
                <MapPin className="mx-auto mb-4 text-editorial-gold opacity-40" size={32} />
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Real-time Telemetry</p>
              </div>
            </div>
            
            <motion.div
              animate={{ 
                x: [100, 300, 150, 400], 
                y: [50, 150, 100, 50] 
              }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute h-1 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
          </section>
        </div>

        {/* Rider Info Sidebar */}
        <div className="lg:col-span-2 space-y-12">
          <section className="border border-white/10 p-10 bg-editorial-dark">
            <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold mb-10 pb-4 border-b border-white/5">The Courier</h3>
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                  alt="Rider"
                  className="h-20 w-20 grayscale border border-white/10"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-serif text-white">Alex Johnson</p>
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-editorial-gold">
                  <Star className="fill-editorial-gold" size={10} />
                  <span>4.9 Distinction</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 border border-white/10 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all">
                <Phone size={14} />
                Call
              </button>
              <button className="flex items-center justify-center gap-3 bg-white text-black py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-editorial-gold hover:text-white transition-all">
                <MessageSquare size={14} />
                Message
              </button>
            </div>
          </section>

          <section className="border border-white/10 p-10">
            <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold mb-10 pb-4 border-b border-white/5">Order Logistics</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-widest opacity-30 font-bold">Provenance</span>
                <span className="text-sm font-serif italic text-white">McBite Burgers</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-widest opacity-30 font-bold">Inventory</span>
                <span className="text-sm text-white font-bold">{order.items.length} Units</span>
              </div>
              <Link to="/help" className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-editorial-gold mt-10 pt-6 border-t border-white/5 hover:opacity-100 opacity-60">
                <span>Support Channel</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
