import { useState } from 'react';
import { Eye, Sparkles, X, ArrowRight, UserCheck } from 'lucide-react';
import { RECENT_STYLES_GALLERY } from '../data/parlourData';
import { GalleryItem, Service } from '../types';

interface GallerySectionProps {
  onSelectServiceForBookingById: (serviceId: string) => void;
  onViewServiceDetailsById: (serviceId: string) => void;
}

export function GallerySection({
  onSelectServiceForBookingById,
  onViewServiceDetailsById,
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { key: 'all', label: 'All Recent Works' },
    { key: 'bridal', label: 'Bridal Artistry' },
    { key: 'hair', label: 'Hair Color & Cuts' },
    { key: 'skin', label: 'Glass Skin Facials' },
  ];

  const filteredItems = RECENT_STYLES_GALLERY.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-stone-100/50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-800 mb-2">
              Style Portfolio & Transformations
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Recent Parlour Lookbook
            </h2>
            <p className="text-stone-600 mt-2 max-w-xl text-sm sm:text-base">
              Explore authentic recent makeovers crafted by our creative directors and master colorists. Every look is tailored to your unique features.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                    active
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 hover:border-stone-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold shadow">
                    <Eye className="w-3.5 h-3.5 text-amber-700" />
                    <span>View Transformation Details</span>
                  </span>
                </div>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-stone-800 text-[11px] font-medium px-2.5 py-1 rounded-md border border-stone-200/60 shadow-sm">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-medium text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>By {item.stylistName}</span>
                    </span>
                    <span className="text-stone-400">Verified Client Look</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    Service: <span className="font-medium text-stone-800">{item.serviceName}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectServiceForBookingById(item.serviceId);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors"
                  >
                    <span>Book This Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Details Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-stone-700 hover:text-stone-900 hover:bg-white shadow transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto">
              {/* Large Image Header */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-stone-900">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 bg-stone-950/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg border border-white/10">
                  {activeModalItem.categoryLabel}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-800 font-medium mb-1">
                    <UserCheck className="w-4 h-4 text-amber-700" />
                    <span>Stylist: {activeModalItem.stylistName}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-500">Service: {activeModalItem.serviceName}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    {activeModalItem.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                    Styling Story & Details
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {activeModalItem.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                    Technique & Formulations Applied
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 font-mono">
                    {activeModalItem.technique}
                  </p>
                </div>

                {activeModalItem.clientFeedback && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                    <div className="text-xs font-semibold text-amber-900 mb-1">
                      Guest Testimonial
                    </div>
                    <blockquote className="text-xs sm:text-sm italic text-amber-950 leading-relaxed">
                      {activeModalItem.clientFeedback}
                    </blockquote>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      const sId = activeModalItem.serviceId;
                      setActiveModalItem(null);
                      onViewServiceDetailsById(sId);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                  >
                    View Complete Service Inclusions
                  </button>

                  <button
                    onClick={() => {
                      const sId = activeModalItem.serviceId;
                      setActiveModalItem(null);
                      onSelectServiceForBookingById(sId);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg transition-colors shadow-sm"
                  >
                    <span>Book This Look Now</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
