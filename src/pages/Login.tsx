import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Login() {
  const { user, signIn, loading } = useAuth();
  
  if (loading) return null;
  if (user) return <Navigate to="/" />;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl"
      >
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900">Welcome Back</h1>
          <p className="text-neutral-500">Sign in to start ordering your favorite food</p>
        </div>

        <button
          onClick={signIn}
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-neutral-200 px-6 py-4 font-bold text-neutral-700 transition-all hover:border-orange-600 hover:bg-orange-50 active:scale-95"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-neutral-500">Or continue with mobile</span>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-all focus:border-orange-600 focus:ring-4 focus:ring-orange-600/10"
          />
          <button className="w-full rounded-xl bg-orange-600 py-4 font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/20">
            Get OTP
          </button>
        </div>

        <p className="text-center text-xs text-neutral-400">
          By continuing, you agree to BiteDash's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
