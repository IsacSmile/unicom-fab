import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from '../../lib/api';

export function AnnouncementBar() {
  const [text, setText] = useState('WHOLESALE ORDERS • MINIMUM 30 PCS • PAN-INDIA & GLOBAL EXPRESS FULFILMENT');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await api.getSettings();
        if (res.settings && res.settings.announcement_text) {
          setText(res.settings.announcement_text);
        }
      } catch (err) {
        // Fallback default
      }
    }
    loadSettings();
  }, []);

  return (
    <div className="bg-brand-950 text-luxury-gold py-2 px-4 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-4 text-center border-b border-brand-800">
      <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
        <Truck className="w-3.5 h-3.5 text-luxury-gold" /> Pan-India Direct Logistics
      </span>
      <span className="hidden md:inline font-mono opacity-40">•</span>
      <span className="flex items-center gap-1.5 text-amber-300 font-medium">
        <Sparkles className="w-3.5 h-3.5" /> {text}
      </span>
      <span className="hidden md:inline font-mono opacity-40">•</span>
      <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
        <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" /> Verified Batch Quality
      </span>
    </div>
  );
}
