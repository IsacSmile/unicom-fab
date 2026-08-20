import React, { useState } from 'react';
import { ShieldCheck, Truck, Factory, Award, Building2, Headset, CheckCircle2 } from 'lucide-react';
import { GuestEnquiryModal } from '../components/enquiry/GuestEnquiryModal';
import { Button } from '../components/common/Button';

export function About() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
          ABOUT UNICOM FAB
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-950">
          Redefining B2B Apparel & Textile Wholesale
        </h1>
        <p className="text-slate-600 text-base leading-relaxed font-light">
          UNICOM FAB is an enterprise-grade wholesale B2B commerce platform built to streamline garment procurement for retailers, brand owners, resellers, and corporate buyers.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
          <span className="font-display font-bold text-3xl sm:text-4xl text-brand-950">250+</span>
          <p className="text-xs text-slate-500 font-mono uppercase">Registered Resellers</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
          <span className="font-display font-bold text-3xl sm:text-4xl text-brand-950">100%</span>
          <p className="text-xs text-slate-500 font-mono uppercase">Batch Lab Inspected</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
          <span className="font-display font-bold text-3xl sm:text-4xl text-brand-950">30 PCS</span>
          <p className="text-xs text-slate-500 font-mono uppercase">Standard Minimum Order</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
          <span className="font-display font-bold text-3xl sm:text-4xl text-amber-700">Pan-India</span>
          <p className="text-xs text-slate-500 font-mono uppercase">Express Freight</p>
        </div>
      </div>

      {/* Core Principles Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <Factory className="w-8 h-8 text-amber-700" />
          <h3 className="font-serif font-bold text-xl text-brand-950">Direct Mill Manufacturing</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We operate in partnership with tier-1 textile spinning mills and garment manufacturing units across India to deliver consistent GSM weight and reactive dyeing.
          </p>
        </div>

        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <ShieldCheck className="w-8 h-8 text-amber-700" />
          <h3 className="font-serif font-bold text-xl text-brand-950">Rigorous Quality Assurance</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every batch assigned a unique code (`BATCH-YYYY-MM-XX`) undergoes shrinkage testing, color fastness inspection, and seam strength validation.
          </p>
        </div>

        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <Truck className="w-8 h-8 text-amber-700" />
          <h3 className="font-serif font-bold text-xl text-brand-950">Commercial Logistics</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Integrated GST invoicing, pallet packaging, and door-to-door commercial transport for smooth retail inventory replenishment.
          </p>
        </div>
      </div>

      {/* Enquiry Banner */}
      <div id="enquiry" className="p-10 bg-brand-950 text-white rounded-3xl text-center space-y-4">
        <h2 className="font-serif font-bold text-3xl text-white">Have Custom Volume or Fabric Requirements?</h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Need custom brand labeling, GSM adjustments, or volume purchases over 1,000 PCS? Submit a direct enquiry with our commercial team.
        </p>
        <Button onClick={() => setEnquiryOpen(true)} variant="gold" size="lg" className="font-bold">
          Submit B2B Wholesale Enquiry
        </Button>
      </div>

      <GuestEnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
