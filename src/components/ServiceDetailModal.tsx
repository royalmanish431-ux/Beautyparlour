import { X, Clock, Check, Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookService: (service: Service) => void;
}

export function ServiceDetailModal({
  service,
  onClose,
  onBookService,
}: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col relative max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide font-medium text-amber-800">
              {service.categoryLabel}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {service.name}
              </h3>
              <div className="font-mono text-xl font-bold text-stone-900 shrink-0">
                ₹{service.price.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-stone-500 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Estimated Duration: {service.duration}</span>
              </span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">Organic / Cruelty-Free</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Treatment Overview
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Inclusions */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              What Is Included In This Session
            </h4>
            <ul className="grid grid-cols-1 gap-2.5 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
              {service.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-stone-800">
                  <Check className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reassurance notes */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/70 text-amber-950 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <span>Autoclaved instruments & disposable hygiene kits.</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-100/70 border border-stone-200 text-stone-800 flex items-start gap-2">
              <HeartHandshake className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <span>Skin patch test & consultation before application.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onBookService(service);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Proceed to Book This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
