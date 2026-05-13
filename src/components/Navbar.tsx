import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, MapPin, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

export default function Navbar() {
  const { user, profile, signIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-editorial-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-serif italic tracking-tighter text-white">
            BiteDash.
          </Link>
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium opacity-60">
            <Link to="/restaurants" className="hover:opacity-100 transition-opacity">Restaurants</Link>
            <Link to="/categories" className="hover:opacity-100 transition-opacity">Grocery</Link>
            <Link to="/exclusive" className="hover:opacity-100 transition-opacity">Exclusive</Link>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-end px-12 md:flex">
          <div className="relative w-full max-w-sm">
            <div className="bg-editorial-dark border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 w-full">
              <Search className="text-white/40" size={14} />
              <input
                type="text"
                placeholder="Search for cuisines or dishes..."
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/30 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative group p-2">
            <div className="w-5 h-5 border border-white/20 group-hover:border-white/60 transition-colors flex items-center justify-center text-[10px] font-bold">
              2
            </div>
          </Link>

          {user ? (
            <Link to="/dashboard" className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] bg-editorial-dark hover:border-white/60 transition-colors">
                {user.displayName?.split(' ').map(n => n[0]).join('') || 'JD'}
              </div>
            </Link>
          ) : (
            <button
              onClick={signIn}
              className="px-4 py-1.5 border border-white/20 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
