import React, { useState } from 'react';
import { ShieldCheck, Truck, Factory, Award, Building2, Headset, CheckCircle2, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { GuestEnquiryModal } from '../components/enquiry/GuestEnquiryModal';
import { Button } from '../components/common/Button';

export function About() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const stats = [
    { value: '250+', label: 'Verified B2B Resellers' },
    { value: '100%', label: 'Batch Lab Inspected' },
    { value: '30 PCS', label: 'Standard Minimum Order' },
    { value: '520+', label: 'Pan-India Freight Routes' },
  ];

  const pillars = [
    {
      icon: Factory,
      title: 'Direct Mill Manufacturing',
      description: 'We operate in direct partnership with tier-1 textile spinning mills and garment production units across India to guarantee exact GSM consistency and reactive color fastness.',
    },
    {
      icon: ShieldCheck,
      title: 'Rigorous Quality Assurance',
      description: 'Every production batch is assigned a unique tracking serial (BATCH-YYYY-MM-XX) and undergoes tensile strength testing, zero-shrinkage washing, and seam inspection.',
    },
    {
      icon: Truck,
      title: 'Commercial Freight & Tax Logistics',
      description: 'Streamlined online purchase orders with automated GST commercial invoicing, pallet packaging, and reliable express shipping to retail stores and regional warehouses.',
    },
    {
      icon: Headset,
      title: 'Dedicated Enterprise Support',
      description: 'Personalized B2B account managers assigned to assist corporate procurement teams with sample swatches, custom brand tags, and custom bulk quantity quotes.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Digital Spec & Batch Inspection',
      description: 'Inspect GSM weights, fiber composition (e.g. 100% Pima Cotton, French Terry), and live warehouse stock levels directly on our digital catalogue.',
    },
    {
      step: '02',
      title: 'Transparent Wholesale Order Placement',
      description: 'Select your exact color variants, size breakdowns, and MOQ step increments with transparent volume discount calculations.',
    },
    {
      step: '03',
      title: 'Express Commercial Dispatch',
      description: 'Orders are packed in protective master boxes with commercial GST invoices and shipped via tracked logistics partners to your store or distribution center.',
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-[#FAF9F6] text-[#101828] relative overflow-hidden space-y-20">
      
      {/* Background Ambient Golden Halo Effect */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#B97832]/15 via-amber-200/20 to-transparent rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Header Hero Banner with Centered Halo */}
        <div className="text-center max-w-3xl mx-auto space-y-4 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E7E3DA] shadow-xs text-xs font-mono font-bold tracking-widest text-[#B97832] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#B97832]" />
            <span>ABOUT UNICOM FAB</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#101828] leading-tight">
            Redefining B2B Apparel & Textile Wholesale
          </h1>

          <p className="text-[#667085] text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            UNICOM FAB is an enterprise-grade wholesale B2B platform engineered to eliminate offline procurement friction for fashion boutiques, retailers, resellers, and corporate buyers.
          </p>
        </div>

        {/* Stats Grid with Hover Halo Effect */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative group bg-white border border-[#E7E3DA] p-6 sm:p-8 rounded-2xl text-center space-y-2 shadow-xs hover:border-[#B97832]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Card Ambient Hover Halo Glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#B97832]/15 via-amber-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
              
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#101828] group-hover:text-[#B97832] transition-colors relative z-10">
                {stat.value}
              </span>
              <p className="text-xs text-[#667085] font-mono uppercase tracking-wider font-semibold relative z-10">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Core Pillars Section with Radial Halo Cards */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B97832] uppercase">
              OPERATIONAL EXCELLENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828]">
              Why Leading Retailers Trust UNICOM FAB
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="relative group bg-white border border-[#E7E3DA] p-8 rounded-2xl shadow-xs hover:shadow-md hover:border-[#B97832]/40 hover:-translate-y-1 transition-all duration-300 space-y-4 overflow-hidden flex flex-col justify-between"
                >
                  {/* Subtle Card Corner Halo Glow */}
                  <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 bg-[#B97832]/15 rounded-full blur-2xl group-hover:bg-[#B97832]/30 transition-colors duration-500" />

                  <div className="space-y-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3EE] border border-[#E7E3DA] text-[#B97832] flex items-center justify-center group-hover:bg-[#B97832] group-hover:text-white group-hover:border-[#B97832] transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#101828] group-hover:text-[#B97832] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#667085] leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Steps Section */}
        <div className="bg-[#F5F3EE] border border-[#E7E3DA] rounded-3xl p-8 sm:p-12 relative overflow-hidden space-y-10">
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 bg-[#B97832]/10 rounded-full blur-3xl" />

          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B97832] uppercase">
              WHOLESALE WORKFLOW
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#101828]">
              How UNICOM FAB Simplifies Bulk Supply
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E7E3DA] space-y-3 relative z-10 shadow-xs">
                <span className="font-mono text-2xl font-bold text-[#B97832] block">
                  {s.step}
                </span>
                <h4 className="font-serif font-bold text-lg text-[#101828]">{s.title}</h4>
                <p className="text-xs text-[#667085] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner with Dark Obsidian & Gold Halo Effect */}
        <div className="relative bg-[#0F172A] text-white rounded-3xl p-10 sm:p-16 text-center space-y-6 overflow-hidden border border-slate-800 shadow-2xl">
          {/* Intense Ambient Golden Halo Glow behind CTA */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#B97832]/30 to-amber-500/20 rounded-full blur-3xl z-0" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B97832] uppercase block">
              CUSTOM ORDERS & BULK VOLUME DISCOUNTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Have Custom Volume or Fabric Requirements?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Need custom brand labeling, GSM adjustments, or volume purchases over 1,000 PCS? Submit a direct wholesale enquiry with our commercial sourcing team.
            </p>
            <div className="pt-4">
              <Button
                onClick={() => setEnquiryOpen(true)}
                variant="gold"
                size="lg"
                icon={ArrowRight}
                className="font-bold shadow-lg"
              >
                Submit B2B Wholesale Enquiry
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* Guest Enquiry Modal Trigger */}
      <GuestEnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
