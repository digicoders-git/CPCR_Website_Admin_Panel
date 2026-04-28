import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, Loader2, Save } from 'lucide-react';
import axios from 'axios';

const Profile = ({ user, onUpdate }) => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const token = localStorage.getItem('token');

    try {
      const res = await axios.put(`${API_URL}/api/auth/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      onUpdate(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    setPassLoading(true);
    setMessage({ type: '', text: '' });

    const token = localStorage.getItem('token');

    try {
      await axios.put(`${API_URL}/api/auth/change-password`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Password change failed' });
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and security preferences</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl font-bold text-sm flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
        }`}>
          <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-rose-500'}`} />
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <User size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
              <div className="relative group">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-primary outline-none transition-all" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-primary outline-none transition-all" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
              Update Profile
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Shield size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Current Password</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  type="password" 
                  value={passwords.currentPassword}
                  onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-amber-500 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">New Password</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  type="password" 
                  value={passwords.newPassword}
                  onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-amber-500 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Confirm New Password</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  type="password" 
                  value={passwords.confirmPassword}
                  onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-amber-500 outline-none transition-all" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={passLoading}
              className="w-full py-4 bg-amber-600 text-white font-black rounded-2xl hover:bg-amber-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {passLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock size={18} />}
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
