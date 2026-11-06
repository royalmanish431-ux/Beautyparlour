import { useState, useMemo } from 'react';
import { Search, Clock, Check, Sparkles, ArrowRight, Info } from 'lucide-react';
import { PARLOUR_SERVICES } from '../data/parlourData';
import { Service } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: Service) => void;
  onViewServiceDetails: (service: Service) => void;
}

type CategoryFilter = 'all' | 'hair' | 'bridal' | 'skin' | 'nails' | 'lashes' | 'spa';

export function ServicesSection({
  onSelectServiceForBooking,
  onViewServiceDetails,
}: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Treatments' },
    { key: 'hair', label: 'Hair & Color' },
    { key: 'bridal', label: 'Bridal Artistry' },
    { key: 'skin', label: 'Skin & Facials' },
    { key: 'nails', label: 'Nails & Hands' },
    { key: 'lashes', label: 'Lashes & Brows' },
    { key: 'spa', label: 'Body Spa' },
  ];

  const filteredServices = useMemo(() => {
    return PARLOUR_SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services" className="py-16 lg:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-800 mb-2">
              Our Curated Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Parlour Treatments & Pricing Menu
            </h2>
            <p className="text-stone-600 mt-2 max-w-xl text-sm sm:text-base">
              Transparent, all-inclusive pricing with certified organic formulations and personalized skin and hair consultations.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments (e.g. balayage, facial)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Functional segmented controls with clean state) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col justify-between p-6 bg-stone-50/70 hover:bg-stone-50 border border-stone-200 hover:border-amber-700/40 rounded-xl transition-all duration-200 group"
              >
                <div>
                  {/* Card Header with Unboxed Metadata */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-medium text-amber-800">{service.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{service.duration}</span>
                    </span>
                    {service.popular && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-700 font-semibold flex items-center gap-0.5">
                          <Sparkles className="w-3 h-3 text-amber-600" /> Popular
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-serif font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included features preview */}
                  <ul className="mt-4 space-y-1.5 pt-3 border-t border-stone-200/70 text-xs text-stone-600">
                    {service.includes.slice(0, 3).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer: Price & Booking CTAs */}
                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-stone-400 uppercase tracking-wider">Starting at</div>
                    <div className="flex items-baseline gap-2 font-mono tabular-nums">
                      <span className="text-xl font-bold text-stone-900">
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                      {service.originalPrice && (
                        <span className="text-xs text-stone-400 line-through">
                          ₹{service.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewServiceDetails(service)}
                      className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors"
                      title="View details & inclusions"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectServiceForBooking(service)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
            <Search className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800">No treatments found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              We couldn't find any services matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
