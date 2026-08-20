import React from 'react';
import { Star, CheckCircle2, ShieldCheck } from 'lucide-react';

const reviewsRow1 = [
  {
    company: 'Kuro Apparel Co.',
    reviewer: 'Vikramaditya S.',
    role: 'Head of Purchasing',
    location: 'Mumbai, MH',
    rating: 5,
    date: '2 weeks ago',
    text: 'UNICOM FAB transformed our seasonal stocking. The 500-piece order of Egyptian cotton tees was delivered on time with excellent fabric GSM quality.',
    order: '500 PCS • Monolith Tee Series',
    initials: 'KA',
  },
  {
    company: 'Aethel Urban Retailers',
    reviewer: 'Ananya Roy',
    role: 'Founder & Merchandiser',
    location: 'Bengaluru, KA',
    rating: 5,
    date: '3 weeks ago',
    text: 'The MOQ and step increment system makes budget planning predictable. The 450 GSM French Terry hoodies sold out in our boutique within a week.',
    order: '350 PCS • Heavyweight Hoodies',
    initials: 'AU',
  },
  {
    company: 'Vanguard Resorts & Apparel',
    reviewer: 'Kabir Mehta',
    role: 'Sourcing Director',
    location: 'Goa & New Delhi',
    rating: 5,
    date: '1 month ago',
    text: 'Finding reliable 100% linen resort shirts with consistent dye lots was impossible before UNICOM FAB. Fast GST invoices and smooth freight handling.',
    order: '250 PCS • Italian Linen Shirts',
    initials: 'VR',
  },
  {
    company: 'Zenith Streetwear Lab',
    reviewer: 'Devansh Parekh',
    role: 'Brand Director',
    location: 'Ahmedabad, GJ',
    rating: 5,
    date: '1 month ago',
    text: 'Seamless wholesale ordering! We ordered 600 pairs of Japanese selvedge denim. Perfect stitching and zero defects across all master boxes.',
    order: '600 PCS • Selvedge Denim',
    initials: 'ZS',
  },
];

const reviewsRow2 = [
  {
    company: 'Apex Procurement Pvt Ltd',
    reviewer: 'Rohan Sharma',
    role: 'Commercial Buyer',
    location: 'Gurugram, HR',
    rating: 5,
    date: '2 weeks ago',
    text: 'Top tier B2B experience. Digital batch tracking allowed us to inspect stock count before committing capital. Dispatch took only 48 hours.',
    order: '400 PCS • Pima Cotton Polos',
    initials: 'AP',
  },
  {
    company: 'Monolith Design Studio',
    reviewer: 'Sneha Kulkarni',
    role: 'Lead Apparel Designer',
    location: 'Pune, MH',
    rating: 5,
    date: '3 weeks ago',
    text: 'The fabric weight and color saturation match exact digital specs. Our retail buyers loved the luxury feel of the drop-shoulder fleece line.',
    order: '300 PCS • Fleece Sweaters',
    initials: 'MD',
  },
  {
    company: 'Velvet Horizon Outfitters',
    reviewer: 'Tanya Sengupta',
    role: 'Category Head',
    location: 'Kolkata, WB',
    rating: 5,
    date: '1 month ago',
    text: 'Outstanding customer support and batch consistency. We have reordered 3 times already. The wholesale volume discounts save us 18% margin.',
    order: '450 PCS • Organic Twill Chinos',
    initials: 'VH',
  },
  {
    company: 'Northstar Corporate Wear',
    reviewer: 'Aarav Singhania',
    role: 'Procurement VP',
    location: 'Hyderabad, TS',
    rating: 5,
    date: '2 months ago',
    text: 'Ordered custom uniform polo shirts for 1,200 employees. Every single shirt matched the Pantone swatch perfectly. Highly recommended B2B supplier.',
    order: '1,200 PCS • Custom Pique Polos',
    initials: 'NC',
  },
];

function GoogleReviewCard({ review }) {
  return (
    <div className="w-[280px] xs:w-[300px] sm:w-[360px] shrink-0 bg-white border border-[#E7E3DA] rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md hover:border-[#B97832]/40 transition-all duration-300 flex flex-col justify-between space-y-3.5 group">
      <div className="space-y-2.5">
        {/* Top Header: Initial Avatar & Company/Reviewer Info + Google G Logo */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F5F3EE] border border-[#E7E3DA] flex items-center justify-center font-bold text-xs text-[#B97832] shrink-0">
              {review.initials}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-xs sm:text-sm text-[#101828] leading-tight truncate group-hover:text-[#B97832] transition-colors">
                {review.company}
              </h4>
              <p className="text-[11px] text-[#667085] leading-tight mt-0.5 truncate">
                {review.reviewer} <span className="text-slate-300">•</span> <span className="text-slate-500">{review.role}</span>
              </p>
            </div>
          </div>
          {/* Authentic Google G SVG */}
          <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 pt-0.5" title="Verified Customer Review">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>
        </div>

        {/* Rating Stars & Relative Date */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#B97832] text-[#B97832]" />
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] text-[#667085] font-mono">• {review.date}</span>
        </div>

        {/* Review Text */}
        <p className="text-xs text-[#344054] leading-relaxed font-normal line-clamp-3">
          "{review.text}"
        </p>
      </div>

      {/* Footer Order Specs & Verified Badge */}
      <div className="pt-2.5 border-t border-[#E7E3DA] flex items-center justify-between gap-2">
        <span className="text-[10px] sm:text-[11px] font-mono text-[#667085] bg-[#F5F3EE] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-[#E7E3DA] truncate max-w-[170px]">
          {review.order}
        </span>
        <span className="text-[9px] sm:text-[10px] text-emerald-800 bg-emerald-50/90 px-1.5 py-0.5 rounded border border-emerald-200 font-medium flex items-center gap-1 shrink-0">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
        </span>
      </div>
    </div>
  );
}

export function TrustSection() {
  // Programmatically duplicate arrays for smooth infinite marquee loops
  const marqueeRow1Data = [...reviewsRow1, ...reviewsRow1, ...reviewsRow1];
  const marqueeRow2Data = [...reviewsRow2, ...reviewsRow2, ...reviewsRow2];

  return (
    <section className="py-12 sm:py-20 bg-[#FAF9F6] border-t border-[#E7E3DA] relative overflow-hidden">
      {/* Side Fade Gradients for Seamless Screen Transitions */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-32 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-32 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <span className="text-xs font-mono font-bold tracking-widest text-[#B97832] uppercase">
            TRUSTED BY 250+ B2B BRANDS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#101828]">
            Client Success & Reseller Stories
          </h2>
          <p className="text-[#667085] text-xs sm:text-base leading-relaxed px-2">
            See why fashion boutiques, corporate procurement teams, and e-commerce brands rely on UNICOM FAB for dependable wholesale supply.
          </p>

          {/* Trust Summary Rating Badge */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white border border-[#E7E3DA] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-2xs text-xs text-[#101828] font-medium">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#B97832] text-[#B97832]" />
                ))}
              </div>
              <span className="font-bold text-[#101828]">5.0 / 5 Rating</span>
              <span className="text-[#E7E3DA] hidden sm:inline">•</span>
              <span className="text-[#667085] flex items-center gap-1 text-[11px] sm:text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B97832]" /> Verified Wholesale Supply
              </span>
            </div>
          </div>
        </div>

        {/* Marquee Rows Container */}
        <div className="space-y-4 sm:space-y-6">
          {/* ROW 1: Right to Left */}
          <div className="overflow-hidden py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="animate-marquee-left gap-4 sm:gap-6">
              {marqueeRow1Data.map((review, idx) => (
                <GoogleReviewCard key={`r1-${idx}`} review={review} />
              ))}
            </div>
          </div>

          {/* ROW 2: Left to Right */}
          <div className="overflow-hidden py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="animate-marquee-right gap-4 sm:gap-6">
              {marqueeRow2Data.map((review, idx) => (
                <GoogleReviewCard key={`r2-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
