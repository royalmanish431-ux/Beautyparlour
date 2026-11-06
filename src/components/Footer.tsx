import { MapPin, Phone, Mail, Clock, MessageCircle, Heart } from 'lucide-react';
import { PARLOUR_INFO } from '../data/parlourData';

interface FooterProps {
  onOpenBooking: () => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand & About */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {PARLOUR_INFO.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                Haute Parlour
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              A bespoke beauty parlour and aesthetic retreat designed for discerning individuals seeking elevated bridal artistry, couture hair transformations, and holistic dermal therapies.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-300 hover:bg-amber-200 rounded-lg transition-colors shadow-xs"
              >
                <span>Reserve an Appointment</span>
              </button>
            </div>
          </div>

          {/* Studio Location & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              Studio Location
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {PARLOUR_INFO.address},<br />
                  {PARLOUR_INFO.city}
                </span>
              </div>
              <a
                href="tel:8630976072"
                className="flex items-center gap-2.5 text-stone-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono font-medium">{PARLOUR_INFO.phoneDisplay} (Call to Book)</span>
              </a>
              <a
                href={PARLOUR_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: 8630976072</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{PARLOUR_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              Salon Hours
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-300 font-medium">Monday to Friday</div>
                  <div>{PARLOUR_INFO.hours.weekdays}</div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-300 font-medium">Saturday & Sunday</div>
                  <div>{PARLOUR_INFO.hours.weekends}</div>
                </div>
              </div>
              <div className="text-[11px] text-amber-300/80 pt-2">
                * Bridal trials and pre-bridal packages available with early morning appointments upon request.
              </div>
            </div>
          </div>

          {/* Quick links & Standards */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              Studio Standards
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              {PARLOUR_INFO.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {PARLOUR_INFO.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Sterilization Protocol Certified</span>
            <span>·</span>
            <span>No Animal Testing</span>
            <span>·</span>
            <span>Dermatologically Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
