import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { Shield } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function GoogleAuthModal() {
  const { showGoogleModal, setShowGoogleModal, loginWithGoogle, authRedirectUrl } = useAuth();
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef(null);
  const { addToast } = useToast();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '926147607973-anpsc5aedtp5f6r0t0aq9ka1r7v98u8j.apps.googleusercontent.com';

  useEffect(() => {
    if (!showGoogleModal) return;

    const handleCredentialResponse = async (response) => {
      setLoading(true);
      try {
        const decoded = parseJwt(response.credential);
        if (decoded && decoded.email) {
          await loginWithGoogle({
            googleId: decoded.sub,
            email: decoded.email,
            name: decoded.name || decoded.email.split('@')[0],
            picture: decoded.picture || '',
          }, authRedirectUrl);
        } else {
          throw new Error('Unable to read Google profile credentials');
        }
      } catch (err) {
        addToast(err.message || 'Google Sign-In failed', 'error');
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(() => {
      if (window.google?.accounts?.id && googleButtonRef.current) {
        clearInterval(interval);
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          width: '320',
          text: 'continue_with',
          shape: 'pill',
        });
      }
    }, 150);

    return () => clearInterval(interval);
  }, [showGoogleModal, clientId, loginWithGoogle, authRedirectUrl, addToast]);

  return (
    <Modal
      isOpen={showGoogleModal}
      onClose={() => setShowGoogleModal(false)}
      title="Google Authentication Required"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-[#B97832] shadow-md mb-4">
          <Shield className="w-7 h-7" />
        </div>

        <h4 className="text-xl font-serif font-bold text-slate-900 mb-1">
          Sign In with Google
        </h4>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed max-w-sm">
          UNICOM FAB requires verified Google OAuth authentication before placing wholesale orders. Click below to sign in with your Google account.
        </p>

        {/* Official Google OAuth Button Container */}
        <div className="w-full flex justify-center py-2 min-h-[50px] items-center">
          {loading ? (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <span>Authenticating with Google...</span>
            </div>
          ) : (
            <div ref={googleButtonRef} />
          )}
        </div>

        <p className="text-[11px] text-slate-400 mt-6">
          By signing in, your Google account name & email are verified according to UNICOM FAB B2B terms.
        </p>
      </div>
    </Modal>
  );
}
