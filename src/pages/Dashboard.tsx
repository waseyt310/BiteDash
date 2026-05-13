import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  Settings, 
  History, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { profile, logout } = useAuth();

  if (!profile) return null;

  const renderCustomerDashboard = () => (
    <div className="space-y-12">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="border border-white/5 bg-editorial-dark p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mb-4">Total Experience</p>
          <h3 className="text-4xl font-serif italic text-white leading-none">12</h3>
          <p className="text-[9px] uppercase tracking-widest opacity-20 mt-2">Completed Journeys</p>
        </div>
        <div className="border border-white/5 bg-editorial-dark p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mb-4">Noir Points</p>
          <h3 className="text-4xl font-serif italic text-white leading-none">1.450</h3>
          <div className="h-1 w-full bg-white/5 mt-4 overflow-hidden">
            <div className="h-full bg-editorial-gold w-3/4" />
          </div>
        </div>
        <div className="border border-white/5 bg-editorial-dark p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 mb-4">Boutiques</p>
          <h3 className="text-4xl font-serif italic text-white leading-none">4</h3>
          <p className="text-[9px] uppercase tracking-widest opacity-20 mt-2">Saved Selections</p>
        </div>
      </div>

      <div className="space-y-10">
        <h2 className="text-2xl font-serif italic text-white">Recent Ledger</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((order, i) => (
            <div key={i} className="flex items-center justify-between p-8 border border-white/5 bg-editorial-dark hover:border-white/20 transition-all group">
              <div className="flex items-center gap-8">
                <div className="h-16 w-16 bg-black border border-white/5 flex items-center justify-center font-serif text-white/20 text-lg italic">
                  MB
                </div>
                <div>
                  <h4 className="text-lg font-serif italic text-white">McBite Burgers</h4>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 mt-1">May 12, 2024 • #{i}924</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-sm font-black text-editorial-gold tracking-widest">$24.50</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30">Settled</p>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-editorial-gold transition-colors" size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRestaurantDashboard = () => (
    <div className="space-y-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
        <div>
          <h1 className="text-5xl font-serif italic text-white mb-2">Maitre D' Panel</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Orchestrating culinary delivery</p>
        </div>
        <button className="bg-white text-black px-8 py-3 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-editorial-gold hover:text-white transition-all">
          Register New Selection
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-4">
        {[
          { label: 'Live Sequences', val: '5' },
          { label: 'Diurnal Revenue', val: '$1,240.50' },
          { label: 'Culinary Stage', val: '3' },
          { label: 'Departure Readiness', val: '2' }
        ].map(stat => (
          <div key={stat.label} className="border border-white/5 bg-editorial-dark p-8">
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-30 font-bold mb-4">{stat.label}</p>
            <h3 className="text-2xl font-serif italic text-white">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid gap-16 lg:grid-cols-2 pt-8">
        <section className="space-y-10">
          <h2 className="text-xl font-serif italic text-white border-b border-white/5 pb-4">Active Kitchen</h2>
          <div className="space-y-4">
             {[1, 2].map(i => (
               <div key={i} className="flex items-center justify-between bg-editorial-dark border border-white/5 p-6 hover:border-white/20 transition-all">
                 <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-editorial-gold">Seq #{i}24</p>
                    <p className="text-sm font-serif italic text-white tracking-wide">2x Big Bite, 1x Fries</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-30">Provenance: John D.</p>
                 </div>
                 <button className="px-4 py-1.5 border border-white/10 text-[9px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all">
                   Ready for Transit
                 </button>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-xl font-serif italic text-white border-b border-white/5 pb-4">Incoming Requests</h2>
          <div className="space-y-4">
             {[1].map(i => (
               <div key={i} className="flex flex-col gap-6 bg-editorial-dark border border-white/10 p-8">
                 <div className="flex items-center gap-4">
                   <Clock className="text-editorial-gold animate-pulse" size={16} />
                   <div className="space-y-1">
                     <p className="text-sm font-serif italic text-white">New Selection Inbound #8241</p>
                     <p className="text-[9px] uppercase tracking-[0.3em] opacity-30">3 mins elapsed</p>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <button className="py-3 border border-red-500/20 text-red-500 text-[9px] uppercase font-bold tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all">
                     Decline
                   </button>
                   <button className="py-3 bg-white text-black text-[9px] uppercase font-bold tracking-[0.3em] hover:bg-editorial-gold hover:text-white transition-all">
                     Accept
                   </button>
                 </div>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="grid gap-16 md:grid-cols-[280px_1fr] pb-24">
      <aside className="space-y-12">
        <div className="space-y-8">
          <div className="relative group mx-auto w-fit">
            <img
              src={`https://ui-avatars.com/api/?name=${profile.displayName}&background=0A0A0A&color=fff&font-size=0.3`}
              alt="Profile"
              className="h-40 w-40 grayscale border border-white/10 transition-transform group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 bg-editorial-gold p-2">
              <CheckCircle2 size={16} className="text-black" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif italic text-white underline underline-offset-8 decoration-white/10">{profile.displayName}</h2>
            <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30 mt-4">{profile.role} account</p>
          </div>
        </div>

        <nav className="flex flex-col space-y-2 border-t border-white/5 pt-8">
          {[
            { icon: ShoppingBag, label: 'Overview', active: true },
            { icon: Settings, label: 'Control' },
            { icon: CreditCard, label: 'Archive' },
          ].map(item => (
            <button 
              key={item.label}
              className={`flex items-center gap-4 px-6 py-4 text-[10px] uppercase font-bold tracking-[0.3em] transition-all border border-transparent ${item.active ? 'bg-white text-black' : 'opacity-40 hover:opacity-100 hover:bg-editorial-dark hover:border-white/5'}`}
            >
              <item.icon size={14} />
              {item.label}
            </button>
          ))}
          <button 
            onClick={logout}
            className="flex items-center gap-4 px-6 py-4 text-[10px] uppercase font-bold tracking-[0.3em] transition-all text-red-500 opacity-60 hover:opacity-100 hover:bg-red-500/5 mt-8"
          >
            <LogOut size={14} /> Relinquish
          </button>
        </nav>
      </aside>

      <main className="min-h-[70vh]">
        {profile.role === 'customer' && renderCustomerDashboard()}
        {profile.role === 'restaurant' && renderRestaurantDashboard()}
      </main>
    </div>
  );
}
