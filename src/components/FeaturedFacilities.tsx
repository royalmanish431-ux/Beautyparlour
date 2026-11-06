import { Sparkles, ArrowRight, Phone, MessageCircle, Check, Clock } from 'lucide-react';
import { FEATURED_FACILITIES, PARLOUR_INFO } from '../data/parlourData';

interface FeaturedFacilitiesProps {
  onSelectServiceForBookingById: (serviceId: string) => void;
}

export function FeaturedFacilities({ onSelectServiceForBookingById }: FeaturedFacilitiesProps) {
  return (
    <section className="py-14 sm:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Core Specialities at Nayasha</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Hair Cut, Party Makeup & Bridal Artistry
            </h2>
            <p className="text-stone-600 mt-2 max-w-2xl text-sm sm:text-base">
              Experience signature salon transformations with our expert beauty masters. Book online or call directly on <span className="font-semibold text-stone-900 font-mono">8630976072</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PARLOUR_INFO.callLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Call: 8630976072</span>
            </a>
            <a
              href={PARLOUR_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Booking</span>
            </a>
          </div>
        </div>

        {/* 3 Core Cards with Dedicated Demo Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="flex flex-col justify-between rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Demo Image Frame */}
              <div>
                <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {facility.title}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-stone-900 font-mono text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {facility.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Duration: {facility.duration}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {facility.title}
                  </h3>
                  <div className="text-xs font-medium text-amber-800 mt-0.5">
                    {facility.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                    {facility.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                    {facility.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                <a
                  href={`https://wa.me/918630976072?text=Hello%20Nayasha,%20I%20would%20like%20to%20book%20an%20appointment%20for%20${encodeURIComponent(
                    facility.title
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                  title="Direct WhatsApp booking for this service"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onSelectServiceForBookingById(facility.serviceId)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg transition-colors shadow-xs"
                >
                  <span>Book {facility.title.split(' ')[0]} Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
