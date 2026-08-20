import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { Shield, Building2, User, Mail } from 'lucide-react';

export function GoogleAuthModal() {
  const { showGoogleModal, setShowGoogleModal, loginWithGoogle, authRedirectUrl } = useAuth();
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSimulatedGoogleAuth = async (email, name) => {
    setLoading(true);
    try {
      await loginWithGoogle({
        googleId: `google_${Date.now()}`,
        email,
        name,
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        companyName: companyName || 'Apex Wholesale Retailers Ltd',
        phone: phone || '+91 98765 43210'
      }, authRedirectUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={showGoogleModal}
      onClose={() => setShowGoogleModal(false)}
      title="B2B Wholesale Authentication Required"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center py-2">
        <div className="w-14 h-14 bg-brand-900 rounded-2xl flex items-center justify-center text-luxury-gold shadow-lg mb-4">
          <Shield className="w-7 h-7" />
        </div>

        <h4 className="text-xl font-serif font-bold text-brand-900 mb-1">
          Sign In to Complete Wholesale Order
        </h4>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          UNICOM FAB is a verified B2B wholesale platform. Authenticated buyer credentials are required before submitting bulk purchase orders.
        </p>

        {/* Business details optional input */}
        <div className="w-full space-y-3 mb-6 text-left">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Company / Retailer Name
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Urban Threads Apparel"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900"
              />
            </div>
          </div>
        </div>

        {/* Google Authentication Trigger */}
        <div className="w-full space-y-3">
          <button
            onClick={() => handleSimulatedGoogleAuth('buyer.retailer@gmail.com', 'Rajesh Kumar (Retailer)')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-mono">Quick Dev Test</span>
            </div>
          </div>

          <Button
            onClick={() => handleSimulatedGoogleAuth('wholesale.buyer@unicomfab.com', 'Demo B2B Buyer')}
            loading={loading}
            variant="secondary"
            className="w-full text-xs"
          >
            Instant Direct Auth (Demo Buyer)
          </Button>
        </div>

        <p className="text-[11px] text-slate-400 mt-4">
          By authenticating, you agree to UNICOM FAB B2B Wholesale terms and verified retailer guidelines.
        </p>
      </div>
    </Modal>
  );
}
