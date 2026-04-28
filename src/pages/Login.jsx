import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  ShoppingCart, 
  Shield 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../components/common/NavItem';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('admin_panel_user', JSON.stringify(res.data.user));
      onLogin(res.data.user);
      navigate('/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 font-sans px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6 shadow-inner">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Admin Login</h1>
          <p className="text-gray-400 font-medium mt-2 text-sm">Sign in to manage your articles</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Email Address</label>
            <div className="relative group">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="admin@cpcr.in" 
                className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary-50 outline-none transition-all" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Password</label>
            <div className="relative group">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
              <input 
                type={showPass ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full pl-11 pr-12 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary-50 outline-none transition-all" 
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 mt-4 active:scale-[0.98]"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-gray-400 font-medium">
          Protected by CPCR Security System
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
