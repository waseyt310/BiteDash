import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, MapPin, Phone, Clock, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(profile?.address || '');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const orderPath = 'orders';
    try {
      const orderData = {
        customerId: user?.uid,
        restaurantId: items[0].restaurantId,
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        total: total + 4.49,
        status: 'pending',
        deliveryAddress: address,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, orderPath), orderData);
      
      setTimeout(() => {
        clearCart();
        navigate(`/order/${docRef.id}`);
      }, 2000);

    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, orderPath);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-16 pb-20">
      <header className="border-b border-white/10 pb-8">
        <h1 className="text-5xl font-serif italic text-white mb-2">Finalize Your Selection</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">Review and secure your order</p>
      </header>

      <form onSubmit={handlePlaceOrder} className="grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-16">
          {/* Delivery Details */}
          <section className="space-y-10">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-editorial-gold" />
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Destination</h2>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[9px] uppercase tracking-widest opacity-30 font-bold">Full Address</label>
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street and Number"
                  className="w-full bg-editorial-dark border border-white/10 px-6 py-4 text-xs text-white outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-widest opacity-30 font-bold">Contact Sequence</label>
                  <input
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-editorial-dark border border-white/10 px-6 py-4 text-xs text-white outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-widest opacity-30 font-bold">Courier Notes</label>
                  <input
                    placeholder="Refined instructions"
                    className="w-full bg-editorial-dark border border-white/10 px-6 py-4 text-xs text-white outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-10">
             <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-editorial-gold" />
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Method of Payment</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <button type="button" className="group border border-editorial-gold p-6 text-left transition-all bg-editorial-dark relative">
                <div className="text-[10px] uppercase tracking-widest font-bold text-editorial-gold mb-1">Standard Card</div>
                <div className="text-xs text-white opacity-60">Verified **** 4242</div>
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-editorial-gold animate-pulse" />
              </button>
              <button type="button" className="group border border-white/10 p-6 text-left transition-all hover:border-white/40">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-1">Cash Ingress</div>
                <div className="text-xs opacity-60">Hand-to-hand exchange</div>
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar Order Review */}
        <div className="lg:col-span-2 space-y-10">
          <div className="border border-white/10 p-10 bg-editorial-dark sticky top-24">
            <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold mb-10 pb-4 border-b border-white/5">The Order</h3>
            <div className="space-y-8">
              <div className="max-h-[30vh] overflow-y-auto space-y-6 pr-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white uppercase tracking-widest">{item.name}</p>
                      <p className="text-[9px] opacity-40 uppercase tracking-widest italic">{item.quantity} units</p>
                    </div>
                    <span className="text-[10px] font-bold text-editorial-gold tracking-widest">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-10 space-y-3">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] opacity-40">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] opacity-40">
                  <span>Logistics</span>
                  <span>$4.49</span>
                </div>
                <div className="flex justify-between text-lg font-serif italic text-white pt-6 border-t border-white/5 mt-6">
                  <span>Total Due</span>
                  <span>${(total + 4.49).toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full mt-10 py-5 bg-white text-black text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-editorial-gold hover:text-white transition-all disabled:opacity-30 relative overflow-hidden group"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="animate-spin" size={12} />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    Comfirm Purchase
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
