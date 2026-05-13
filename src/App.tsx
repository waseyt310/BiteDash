/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: string }) {
  const { user, profile, loading } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && profile?.role !== role) return <Navigate to="/" />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <div className="min-h-screen bg-editorial-black font-sans text-editorial-paper selection:bg-editorial-gold selection:text-white">
          <Navbar />
          <main className="container mx-auto px-6 py-12 max-w-7xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/cart" element={<Cart />} />
              
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              
              <Route path="/order/:id" element={
                <ProtectedRoute>
                  <OrderTracking />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          <footer className="border-t border-white/5 py-24 px-6 mt-20">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h2 className="font-serif italic text-3xl text-white">BiteDash.</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 leading-loose max-w-xs">
                  The intersection of gastronomy and technology. Delivered to your door with uncompromising standards.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Legal</h4>
                <div className="flex flex-col gap-2 text-[10px] uppercase tracking-widest font-bold opacity-50">
                  <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
                  <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
                  <a href="#" className="hover:opacity-100 transition-opacity">Refund Policy</a>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Social</h4>
                <div className="flex flex-col gap-2 text-[10px] uppercase tracking-widest font-bold opacity-50">
                  <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                  <a href="#" className="hover:opacity-100 transition-opacity">Journal</a>
                  <a href="#" className="hover:opacity-100 transition-opacity">Curation</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

