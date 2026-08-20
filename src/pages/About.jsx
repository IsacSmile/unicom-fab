import React, { useState } from 'react';
import { ShieldCheck, Truck, Factory, Award, Building2, Headset, CheckCircle2, ArrowRight, Sparkles, MapPin, Calendar, Layers, Quote } from 'lucide-react';
import { GuestEnquiryModal } from '../components/enquiry/GuestEnquiryModal';
import { Button } from '../components/common/Button';

export function About() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const stats = [
    { value: '30+ YRS', label: 'Textile Manufacturing Heritage' },
    { value: '500K+', label: 'Annual Apparel Units Crafted' },
    { value: '520+', label: 'Pan-India Freight Routes' },
    { value: '100%', label: 'In-House Lab Inspected' },
  ];

  const milestones = [
    {
      year: '1994',
      title: 'The Single Handloom in Kolkata',
      location: 'Burrabazar, Kolkata',
      description: 'Founder Rajeshwar Das began crafting premium cotton fabrics with a single handloom in Kolkata’s historic textile district.',
    },
    {
      year: '2008',
      title: 'Automated Mill Expansion',
      location: 'Metiabruz Industrial Zone',
      description: 'Transitioned into large-scale automated knitting & dyeing mills, setting high GSM consistency standards across Bengal.',
    },
    {
      year: '2018',
      title: 'Pan-India B2B Logistics Network',
      location: 'Kolkata Central Hub',
      description: 'Established direct freight distribution routes connecting Kolkata to over 500+ wholesale markets across India.',
    },
    {
      year: '2026',
      title: 'UNICOM FAB Digital Wholesale',
      location: 'Digital Procurement Platform',
      description: 'Launched a direct B2B platform eliminating middleman inflation and providing instant GST invoices for boutique owners.',
    },
  ];

  const pillars = [
    {
      icon: Factory,
      title: 'Kolkata Manufacturing Hub',
      description: 'Our state-of-the-art production facility in Kolkata integrates precision knitting, eco-friendly reactive dyeing, and zero-shrinkage washing.',
    },
    {
      icon: ShieldCheck,
      title: 'Rigorous Batch Quality Control',
      description: 'Every production lot is assigned a serial tracking batch (e.g. BATCH-2026-AUTUMN) and tested for seam strength and color fastness.',
    },
    {
      icon: Truck,
      title: 'Express Commercial Freight',
      description: 'Direct logistics from Kolkata to distribution hubs nationwide with automated GST tax invoices and master carton protection.',
    },
    {
      icon: Headset,
      title: 'Dedicated Account Managers',
      description: 'Personalized B2B assistance for boutique retailers, helping manage custom GSM requirements, sample swatches, and bulk quotes.',
    },
  ];

  return (
    <div className="py-8 sm:py-14 bg-[#FAF9F6] text-[#101828] relative overflow-hidden space-y-10 sm:space-y-16 font-neue">
      
      {/* Background Ambient Golden Halo Effect */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#B97832]/12 via-amber-200/15 to-transparent rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-16">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E3DA] shadow-2xs text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-[#B97832] uppercase">
            <MapPin className="w-3 h-3 text-[#B97832]" />
            <span>ESTABLISHED 1994 • KOLKATA, INDIA</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#101828] leading-tight">
            From a Kolkata Handloom to a <br className="hidden sm:inline" />
            <span className="text-[#B97832] italic font-normal">Pan-India Wholesale Legacy</span>
          </h1>

          <p className="text-[#667085] text-xs sm:text-sm lg:text-base leading-relaxed font-light max-w-xl mx-auto px-2">
            The story of Rajeshwar Das, thirty years of Bengal textile mastery, and how UNICOM FAB modernized B2B apparel supply for retailers nationwide.
          </p>
        </div>

        {/* Founder Story Chapter 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-white border border-[#E7E3DA] p-4 sm:p-7 rounded-2xl shadow-2xs">
          
          {/* Left: Founder Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/4.5] group">
              <img
                src="/kolkata-founder-story.png"
                alt="Rajeshwar Das - Founder of UNICOM FAB Kolkata"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
              
              {/* Badge overlay on Image */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-lg border border-slate-800 text-white space-y-0.5">
                <span className="text-[9px] font-mono text-[#B97832] font-bold uppercase tracking-wider block">FOUNDER & MASTER CRAFTSMAN</span>
                <h4 className="font-serif font-bold text-sm text-white">Rajeshwar Das</h4>
                <p className="text-[11px] text-slate-300 font-light">Pioneered Kolkata’s direct apparel manufacturing standards since 1994.</p>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#B97832] uppercase">
                CHAPTER I — THE BEGINNING
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#101828]">
                A Single Loom in Burrabazar
              </h2>
            </div>

            <p className="text-[#667085] text-xs sm:text-sm leading-relaxed font-light">
              In 1994, amidst the bustling textile lanes of Kolkata’s historic Burrabazar, <strong className="text-slate-900 font-semibold">Rajeshwar Das</strong> began his journey with a single hand-driven loom. Working under yellow streetlamps into the late hours, he meticulously inspected every spool of cotton thread to craft garments built to endure.
            </p>

            <p className="text-[#667085] text-xs sm:text-sm leading-relaxed font-light">
              While observing traditional wholesale markets, Rajeshwar noticed a glaring flaw: retailers were routinely subjected to middleman price inflation, variable GSM fabric weights, and unpredictable delivery schedules. He set out with a simple mission—to bring honesty, precision, and direct factory pricing to every boutique owner.
            </p>

            {/* Founder Quote Card */}
            <div className="p-3.5 sm:p-4 bg-[#FAF9F6] border-l-4 border-[#B97832] rounded-r-xl space-y-1 text-slate-800">
              <Quote className="w-4 h-4 text-[#B97832] opacity-60" />
              <p className="font-serif italic text-xs sm:text-sm text-slate-900 leading-snug">
                "Quality fabric isn't just woven with thread—it is woven with trust, discipline, and absolute respect for the merchant's margin."
              </p>
              <span className="text-[11px] font-mono text-[#B97832] font-bold block">— Rajeshwar Das, Founder</span>
            </div>
          </div>

        </div>

        {/* Milestone Timeline */}
        <div className="space-y-6 text-center">
          <div className="space-y-1.5 max-w-xl mx-auto">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#B97832] uppercase">
              JOURNEY OF EXCELLENCE
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#101828]">
              Three Decades of Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E7E3DA] p-4 rounded-xl space-y-2 shadow-2xs hover:border-[#B97832]/50 hover:-translate-y-0.5 transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-[#B97832]">{m.year}</span>
                  <Calendar className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#B97832] transition-colors" />
                </div>
                <h3 className="font-serif font-bold text-sm text-[#101828]">{m.title}</h3>
                <span className="text-[10px] font-mono text-slate-500 block font-medium">📍 {m.location}</span>
                <p className="text-xs text-[#667085] leading-relaxed font-light">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Story Chapter 2: Modern Kolkata Factory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-slate-900 text-white p-4 sm:p-7 rounded-2xl shadow-xl">
          
          {/* Left: Narrative Story */}
          <div className="lg:col-span-7 space-y-4 text-left order-2 lg:order-1">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#B97832] uppercase">
                CHAPTER II — THE MODERN ERA
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-white">
                Building UNICOM FAB in Kolkata
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Today, UNICOM FAB operates a modernized manufacturing & dispatch center in Kolkata. Spanning advanced circular knitting units, computerized pattern cutting, and eco-friendly dye houses, we process over 500,000+ garment units every year.
            </p>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              With UNICOM FAB’s digital wholesale portal, boutique owners and corporate resellers across India can inspect exact batch numbers, view transparent tier pricing, and receive instant GST tax invoices—direct from Kolkata’s finest manufacturing floor to their store doorstep.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {stats.map((s, i) => (
                <div key={i} className="border-l-2 border-[#B97832] pl-2.5 space-y-0.5">
                  <span className="font-mono font-bold text-base text-white block">{s.value}</span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Modern Factory Image */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-xl aspect-[4/4.5] group">
              <img
                src="/kolkata-factory-story.png"
                alt="UNICOM FAB Modern Garment Factory Kolkata"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85" />
              
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-lg border border-slate-800 text-white space-y-0.5">
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">KOLKATA MANUFACTURING CENTER</span>
                <h4 className="font-serif font-bold text-xs text-white">State-of-the-Art Production Facility</h4>
                <p className="text-[10px] text-slate-300 font-light">Inspected batch quality, zero-shrinkage finishing, and express dispatch.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Core Pillars Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#B97832] uppercase">
              OUR STANDARDS
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#101828]">
              Why Retailers Partner With UNICOM FAB
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="relative group bg-white border border-[#E7E3DA] p-4 sm:p-5 rounded-xl shadow-2xs hover:border-[#B97832]/40 hover:-translate-y-0.5 transition-all duration-300 space-y-3 overflow-hidden flex flex-col justify-between"
                >
                  <div className="space-y-2.5 relative z-10">
                    <div className="w-9 h-9 rounded-lg bg-[#F5F3EE] border border-[#E7E3DA] text-[#B97832] flex items-center justify-center group-hover:bg-[#B97832] group-hover:text-white group-hover:border-[#B97832] transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#101828] group-hover:text-[#B97832] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#667085] leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="relative bg-[#0F172A] text-white rounded-2xl p-6 sm:p-10 text-center space-y-4 overflow-hidden border border-slate-800 shadow-xl">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#B97832]/30 to-amber-500/20 rounded-full blur-3xl z-0" />

          <div className="relative z-10 space-y-3 max-w-xl mx-auto">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#B97832] uppercase block">
              DIRECT FACTORY INQUIRIES & BULK ORDERS
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-white">
              Connect With Our Kolkata Wholesale Sourcing Desk
            </h2>
            <p className="text-slate-300 text-xs font-light leading-relaxed px-2">
              Require custom GSM specifications, private brand tagging, or bulk volume orders over 1,000 PCS? Submit a wholesale enquiry directly to our Kolkata team.
            </p>
            <div className="pt-1">
              <Button
                onClick={() => setEnquiryOpen(true)}
                variant="gold"
                size="md"
                icon={ArrowRight}
                className="font-bold shadow-md text-xs sm:text-sm py-2.5 px-5 rounded-xl"
              >
                Send Wholesale Enquiry
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
