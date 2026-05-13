import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, ChevronRight, Zap, ShoppingBag, ArrowLeft, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { seedGroceryData } from '../lib/seed';
import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from '../lib/sampleData';
import { GroceryCategory, GroceryProduct } from '../types/store';
import ProductCard from '../components/grocery/ProductCard';

export default function Grocery() {
  const [categories, setCategories] = useState<GroceryCategory[]>(SAMPLE_CATEGORIES);
  const [products, setProducts] = useState<GroceryProduct[]>(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'popular'>('popular');

  const fetchData = async () => {
    setLoading(true);
    try {
      // Seed first if needed and user is signed in
      if (auth.currentUser) {
        await seedGroceryData();
      }

      const catsSnapshot = await getDocs(collection(db, 'grocery_categories'));
      if (!catsSnapshot.empty) {
        setCategories(catsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GroceryCategory)));
      }

      let productsQuery = query(collection(db, 'groceries'));
      
      if (selectedCategory) {
        productsQuery = query(productsQuery, where('category', '==', selectedCategory));
      }

      const prodsSnapshot = await getDocs(productsQuery);
      if (!prodsSnapshot.empty) {
        let prods = prodsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GroceryProduct));
        
        // client side sorting for demo simplicity
        if (sortBy === 'price_asc') prods.sort((a, b) => a.price - b.price);
        if (sortBy === 'price_desc') prods.sort((a, b) => b.price - a.price);

        setProducts(prods);
      } else if (selectedCategory) {
        // Fallback for filtered samples if Firestore is empty
        setProducts(SAMPLE_PRODUCTS.filter(p => p.category === selectedCategory));
      } else {
        setProducts(SAMPLE_PRODUCTS);
      }
    } catch (error) {
      console.error('Error fetching grocery data:', error);
      // Stay with samples if error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, sortBy]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const flashSaleItems = products.filter(p => p.isFlashSale);

  return (
    <div className="space-y-12 pb-24">
      {/* Header & Search */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-serif italic text-white leading-none">Grocery.</h1>
            <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-40">Fresh essentials delivered at speed</p>
          </div>
          
          <div className="relative w-full max-w-lg group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={16} className="text-white/20 group-focus-within:text-editorial-gold" />
            </div>
            <input
              type="text"
              placeholder="Search bananas, eggs, organic milk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-editorial-dark border border-white/10 pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-editorial-gold focus:ring-1 focus:ring-editorial-gold transition-all"
            />
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-none px-6 py-2 border transition-all text-[10px] uppercase font-bold tracking-widest ${
              selectedCategory === null 
                ? 'bg-white text-black border-white' 
                : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
            }`}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex-none px-6 py-2 border transition-all text-[10px] uppercase font-bold tracking-widest flex items-center gap-3 ${
                selectedCategory === cat.name 
                  ? 'bg-white text-black border-white' 
                  : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      {flashSaleItems.length > 0 && !selectedCategory && (
        <section className="relative overflow-hidden bg-editorial-gold h-48 group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay opacity-30" />
          <div className="relative h-full container flex items-center justify-between px-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-black bg-white px-2 py-0.5 w-fit">
                <Zap size={10} fill="currentColor" /> Flash Sale
              </div>
              <h2 className="text-4xl font-serif italic text-white">Save Up To 50%</h2>
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/80">Only For The Next 2 Hours</p>
            </div>
            <button className="bg-black text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all">
              Shop Now
            </button>
          </div>
        </section>
      )}

      {/* Filter & Sort Bar */}
      <section className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40">
            <SlidersHorizontal size={14} /> Filter & Sort
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent border-none text-[10px] uppercase font-bold tracking-widest text-white outline-none cursor-pointer hover:text-editorial-gold"
          >
            <option value="popular">Popularity</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
        <div className="text-[10px] uppercase tracking-widest font-bold opacity-30">
          Showing {filteredProducts.length} Results
        </div>
      </section>

      {/* Products Grid */}
      <section>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-square bg-white/5" />
                <div className="h-4 bg-white/5 w-3/4" />
                <div className="h-4 bg-white/5 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center">
              <ShoppingBag className="text-white/20" size={32} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-serif italic text-white mb-2">No products found</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-40">Try adjusting your filters or search query</p>
            </div>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
              className="text-[10px] uppercase tracking-widest font-bold text-editorial-gold border-b border-editorial-gold/20 hover:border-editorial-gold transition-all pb-1"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <section className="border-t border-white/5 pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group p-8 border border-white/5 hover:border-white/20 transition-all bg-editorial-dark cursor-pointer">
          <div className="w-8 h-8 rounded-full border border-editorial-gold/40 flex items-center justify-center text-editorial-gold mb-6 group-hover:bg-editorial-gold group-hover:text-white transition-all">
            <Clock size={16} />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Same-Day Delivery</h4>
          <p className="text-[10px] leading-relaxed opacity-40 uppercase tracking-widest">Available in major metro areas for orders before 2PM.</p>
        </div>
        
        <div className="group p-8 border border-white/5 hover:border-white/20 transition-all bg-editorial-dark cursor-pointer">
          <div className="w-8 h-8 rounded-full border border-editorial-gold/40 flex items-center justify-center text-editorial-gold mb-6 group-hover:bg-editorial-gold group-hover:text-white transition-all">
            <Zap size={16} />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Express Checkout</h4>
          <p className="text-[10px] leading-relaxed opacity-40 uppercase tracking-widest">Saved addresses and payments for one-tap ordering.</p>
        </div>

        <div className="group p-8 border border-white/5 hover:border-white/20 transition-all bg-editorial-dark cursor-pointer">
          <div className="w-8 h-8 rounded-full border border-editorial-gold/40 flex items-center justify-center text-editorial-gold mb-6 group-hover:bg-editorial-gold group-hover:text-white transition-all">
            <SlidersHorizontal size={16} />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Smart Inventory</h4>
          <p className="text-[10px] leading-relaxed opacity-40 uppercase tracking-widest">Real-time stock tracking reveals exactly what's available.</p>
        </div>
      </section>
    </div>
  );
}
