import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { ShieldCheck, User, Lock, Mail } from 'lucide-react';

export function Login() {
  const { promptGoogleAuth, loginAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('customer'); // 'customer' or 'admin'

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginAdmin(adminEmail, adminPassword);
      navigate('/admin');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-3 font-neue">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 text-[#B97832] border border-slate-800 shadow-md flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Wholesale Portal Authentication</h2>
            <p className="text-xs text-slate-500 font-normal">Access your B2B customer account or system admin panel</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('customer')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'customer' ? 'bg-white text-brand-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Buyer Google Auth
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'admin' ? 'bg-white text-brand-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Admin Sign In
          </button>
        </div>

        {activeTab === 'customer' ? (
          <div className="space-y-4 text-center py-4">
            <p className="text-xs text-slate-600">
              Wholesale buyers must authenticate using Google OAuth to review and confirm purchase orders.
            </p>
            {user && !user.isAdmin ? (
              <div className="p-4 bg-emerald-50 rounded-xl text-xs text-emerald-900 font-semibold space-y-2">
                <p>Authenticated as {user.name} ({user.email})</p>
                <div className="flex justify-center gap-2">
                  <Button onClick={() => navigate('/my-order')} size="sm" variant="primary">
                    View My Wholesale Order
                  </Button>
                  <Button onClick={logout} size="sm" variant="outline">
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => promptGoogleAuth('/my-order')}
                variant="primary"
                size="lg"
                icon={User}
                className="w-full font-bold"
              >
                Sign in with Google
              </Button>
            )}
          </div>
        ) : (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Admin User ID / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@unicomfab.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-950"
                />
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              variant="gold"
              size="lg"
              icon={ShieldCheck}
              className="w-full font-bold"
            >
              Sign In to Admin Portal
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
