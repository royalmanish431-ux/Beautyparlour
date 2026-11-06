import { Star, Award, Calendar, Sparkles } from 'lucide-react';
import { PARLOUR_STYLISTS } from '../data/parlourData';
import { Stylist } from '../types';

interface StylistsSectionProps {
  onSelectStylistForBooking: (stylist: Stylist) => void;
}

export function StylistsSection({ onSelectStylistForBooking }: StylistsSectionProps) {
  return (
    <section id="stylists" className="py-16 lg:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-800 mb-2">
            Artisans of Beauty
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Meet Our Master Stylists & Aestheticians
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base">
            Every artist at Aura Luxe brings over half a decade of international training, meticulous hygiene mastery, and artistic vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARLOUR_STYLISTS.map((stylist) => (
            <div
              key={stylist.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-700/50 hover:bg-stone-50/90 transition-all duration-200 group"
            >
              <div>
                {/* Stylist Monogram / Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-700 to-amber-900 text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm">
                    {stylist.avatar}
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-stone-200 text-xs font-semibold text-stone-900">
                    <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    <span className="font-mono tabular-nums">{stylist.rating}</span>
                    <span className="text-stone-400 font-normal">({stylist.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  {stylist.name}
                </h3>

                <div className="text-xs font-medium text-amber-800 mt-0.5">
                  {stylist.role}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2">
                  <Award className="w-3.5 h-3.5 text-stone-400" />
                  <span>{stylist.experience} Experience</span>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200/80">
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Specialty</div>
                  <div className="text-xs font-semibold text-stone-800 mt-0.5">
                    {stylist.specialty}
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                  {stylist.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200">
                <button
                  onClick={() => onSelectStylistForBooking(stylist)}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {stylist.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
