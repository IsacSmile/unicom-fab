import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { api } from '../../lib/api';

export function AnnouncementBar() {
  const [text, setText] = useState('WHOLESALE ORDERS • MINIMUM 30 PCS');

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
    <div className="bg-[#0F172A] text-slate-300 py-1.5 px-3 sm:px-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2.5 sm:gap-4 text-center border-b border-slate-800 shrink-0">
      <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
        <Truck className="w-3 h-3 text-[#B97832]" /> Pan-India Direct Logistics
      </span>

      <span className="hidden md:inline text-slate-600 font-sans">•</span>

      <span className="inline-flex items-center gap-1.5 text-[#B97832] font-bold tracking-wider truncate">
        <Sparkles className="w-3 h-3 shrink-0" /> {text}
      </span>

      <span className="hidden md:inline text-slate-600 font-sans">•</span>

      <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
        <ShieldCheck className="w-3 h-3 text-[#B97832]" /> Verified Batch Quality
      </span>
    </div>
  );
}
