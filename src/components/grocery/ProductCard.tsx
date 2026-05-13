import { Heart, Plus, Minus, Clock, Zap, Star, ShieldCheck, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { GroceryProduct } from '../../types/store';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }: { product: GroceryProduct, key?: any }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-editorial-dark border border-white/10 p-4 hover:border-white/30 transition-all flex flex-col h-full relative"
    >
      <div className="relative aspect-square overflow-hidden mb-4 bg-black/20">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400';
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <div className="bg-editorial-gold text-white text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter">
              {product.discount}% OFF
            </div>
          )}
          {product.isOrganic && (
            <div className="bg-green-600 text-white text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter flex items-center gap-1">
              <Leaf size={8} fill="currentColor" /> Organic
            </div>
          )}
          {product.isBestseller && (
            <div className="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter">
              Bestseller
            </div>
          )}
        </div>

        {product.isFlashSale && (
          <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full animate-pulse">
            <Zap size={10} fill="currentColor" />
          </div>
        )}

        <button className="absolute bottom-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-full text-white/50 hover:text-white transition-colors">
          <Heart size={14} />
        </button>
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{product.brand}</div>
          {product.rating && (
            <div className="flex items-center gap-1 text-[9px] text-editorial-gold font-bold">
              <Star size={8} fill="currentColor" />
              {product.rating}
            </div>
          )}
        </div>
        <h3 className="text-sm font-sans font-medium text-white line-clamp-1">{product.name}</h3>
        <div className="text-[10px] text-white/60">{product.unit}</div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-base font-bold text-white">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-white/30 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-[9px] text-white/40 uppercase tracking-tighter font-bold">
          <Clock size={10} />
          {product.deliveryEta}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <div className="flex items-center border border-white/10 rounded-sm">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="p-1 hover:bg-white/5"
          >
            <Minus size={10} />
          </button>
          <span className="px-2 text-[10px] font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="p-1 hover:bg-white/5"
          >
            <Plus size={10} />
          </button>
        </div>
        <button
          onClick={() => addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image,
            restaurantId: 'grocery',
            restaurantName: 'BiteDash Grocery'
          })}
          className="flex-1 bg-white text-black text-[9px] uppercase font-bold tracking-widest py-2 hover:bg-editorial-gold hover:text-white transition-all flex items-center justify-center gap-1"
        >
          <Plus size={12} /> Add
        </button>
      </div>
      
      {!product.inStock && (
        <div className="absolute inset-0 bg-editorial-black/60 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-10">
          <span className="text-[9px] uppercase tracking-[0.2em] font-black bg-white text-black px-4 py-2">Out of Stock</span>
        </div>
      )}
    </motion.div>
  );
}
