import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Area */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl shadow-2xl border backdrop-blur-md text-xs transition-all duration-300 animate-slide-up ${
              toast.type === 'success'
                ? 'bg-slate-950/95 text-slate-100 border-emerald-500/30 border-l-4 border-l-emerald-500'
                : toast.type === 'error'
                ? 'bg-slate-950/95 text-slate-100 border-red-500/30 border-l-4 border-l-red-500'
                : 'bg-slate-950/95 text-slate-100 border-amber-500/30 border-l-4 border-l-amber-500'
            }`}
          >
            <div className="shrink-0">
              {toast.type === 'success' && (
                <div className="p-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="p-1 bg-red-500/10 rounded-full border border-red-500/20">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="p-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                  <Info className="w-4 h-4 text-amber-400" />
                </div>
              )}
            </div>

            <span className="flex-1 font-medium leading-normal text-slate-200">{toast.message}</span>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-1 hover:bg-slate-800/60 rounded-md transition-colors shrink-0"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
