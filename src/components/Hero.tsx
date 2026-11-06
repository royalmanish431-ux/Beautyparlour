import { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Clock, Heart } from 'lucide-react';
import { HERO_IMAGE } from '../data/parlourData';

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const [imgLoaded, setImgLoaded] = useState(true);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/60 via-stone-50 to-stone-50 pt-8 pb-16 lg:pt-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-100/80 border border-amber-200 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Nayasha Beauty Parlour · Call 8630976072</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12] text-balance">
              Expert Hair Cut, Party Makeup & Royal Bridal Artistry
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl text-balance">
              Welcome to <span className="font-semibold text-stone-900">Nayasha</span>. We specialize in trending haircuts, flawless party makeovers, and exquisite bridal makeup designed to enhance your natural beauty.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-98 whitespace-nowrap shrink-0"
              >
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <a
                href="tel:8630976072"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-stone-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Call: 8630976072</span>
              </a>
            </div>

            {/* Quick Stylist Consultation Note */}
            <div className="pt-2 flex items-center gap-3 text-xs text-stone-500">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full ring-2 ring-white bg-rose-200 text-rose-900 font-semibold text-[10px]">PS</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full ring-2 ring-white bg-amber-200 text-amber-900 font-semibold text-[10px]">AV</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full ring-2 ring-white bg-emerald-200 text-emerald-900 font-semibold text-[10px]">SL</span>
              </div>
              <div>
                <span className="font-medium text-stone-800">Complimentary 15-min consultation</span> included with all color & bridal appointments.
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Image Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-xl bg-stone-200 aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] group">
              {imgLoaded ? (
                <img
                  src={HERO_IMAGE}
                  alt="Aura Luxe Beauty Parlour & Styling Studio Interior"
                  referrerPolicy="no-referrer"
                  onError={() => setImgLoaded(false)}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              ) : (
                /* Styled fallback container */
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-50 to-stone-100 text-center">
                  <Sparkles className="w-12 h-12 text-amber-600 mb-3" />
                  <span className="font-serif text-2xl font-semibold text-stone-800">Aura Luxe Studio</span>
                  <span className="text-sm text-stone-500 mt-1">Sanctuary of Haute Hair, Bridal & Skincare</span>
                </div>
              )}

              {/* Floating ambient badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-stone-200/80 shadow-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-700 fill-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                    <span>Rated 4.98 / 5.0</span>
                    <span className="text-stone-400">·</span>
                    <span className="font-normal text-stone-600">850+ Verified Reviews</span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Voted Premier Luxury Parlour & Bridal Studio 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Adjacent Proof Strip (below hero split) */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800 shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">100% Sanitized Suites</h4>
              <p className="text-xs text-stone-500 mt-0.5">Medical-grade sterilization for all tools & autoclaved kits.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Couture Formulations</h4>
              <p className="text-xs text-stone-500 mt-0.5">Olaplex, Kerastase, Charlotte Tilbury & organic actives.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800 shrink-0">
              <Clock className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Zero-Wait Guarantee</h4>
              <p className="text-xs text-stone-500 mt-0.5">Strict dedicated appointment slots with your chosen stylist.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800 shrink-0">
              <Heart className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Cruelty-Free & Clean</h4>
              <p className="text-xs text-stone-500 mt-0.5">Ethically sourced, sulfate-free, and vegan-friendly treatments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
