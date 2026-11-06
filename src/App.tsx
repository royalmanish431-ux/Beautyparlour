import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedFacilities } from './components/FeaturedFacilities';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { StylistsSection } from './components/StylistsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { Footer } from './components/Footer';
import { INITIAL_REVIEWS, PARLOUR_SERVICES, PARLOUR_INFO } from './data/parlourData';
import { Booking, Review, Service } from './types';
import { Sparkles, Phone, Calendar, MessageCircle } from 'lucide-react';

const STORAGE_BOOKINGS_KEY = 'aura_parlour_bookings_v1';
const STORAGE_REVIEWS_KEY = 'aura_parlour_reviews_v1';

export default function App() {
  // Load or initialize bookings from localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Initial sample booking for immediate demonstration of the booking manager
    return [
      {
        id: 'AUR-58291',
        serviceIds: ['hair-balayage'],
        serviceNames: ['Sun-Kissed Caramel Balayage & Gloss'],
        totalPrice: 4800,
        stylistId: 'stylist-ananya',
        stylistName: 'Ananya Verma',
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        timeSlot: '11:15 AM',
        clientName: 'Pooja Kapoor',
        clientPhone: '+91 98112 34567',
        clientEmail: 'pooja.kapoor@example.com',
        notes: 'Pre-wedding photoshoot next week. Needs warm caramel ribbons.',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Load or initialize reviews from localStorage
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_REVIEWS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_REVIEWS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [selectedDetailService, setSelectedDetailService] = useState<Service | null>(null);

  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [preSelectedStylistId, setPreSelectedStylistId] = useState<string | undefined>(undefined);

  // Booking handlers
  const handleOpenBooking = (serviceId?: string, stylistId?: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedStylistId(stylistId);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  const handleRescheduleBooking = (
    bookingId: string,
    newDate: string,
    newTime: string
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, date: newDate, timeSlot: newTime, status: 'rescheduled' }
          : b
      )
    );
  };

  // Review handlers
  const handleAddReview = (
    newRev: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'avatarBg'>
  ) => {
    const avatarBgs = [
      'bg-amber-100 text-amber-800',
      'bg-rose-100 text-rose-800',
      'bg-emerald-100 text-emerald-800',
      'bg-indigo-100 text-indigo-800',
      'bg-stone-200 text-stone-800',
    ];
    const randomBg = avatarBgs[Math.floor(Math.random() * avatarBgs.length)];

    const createdReview: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0,
      avatarBg: randomBg,
    };

    setReviews((prev) => [createdReview, ...prev]);
  };

  const handleUpvoteReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
  };

  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 selection:bg-amber-100 selection:text-amber-950 pb-16 md:pb-0">
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookings={bookings}
      />

      <main className="flex-1">
        {/* Hero Section with High-Fidelity Demo Imagery */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Featured Core Facilities (Hair Cut, Makeup, Bridal Makeup with demo images) */}
        <div id="specialties">
          <FeaturedFacilities
            onSelectServiceForBookingById={(serviceId) => handleOpenBooking(serviceId)}
          />
        </div>

        {/* Services Menu Section */}
        <ServicesSection
          onSelectServiceForBooking={(service) => handleOpenBooking(service.id)}
          onViewServiceDetails={(service) => setSelectedDetailService(service)}
        />

        {/* Recent Styles Lookbook Gallery */}
        <GallerySection
          onSelectServiceForBookingById={(serviceId) => handleOpenBooking(serviceId)}
          onViewServiceDetailsById={(serviceId) => {
            const found = PARLOUR_SERVICES.find((s) => s.id === serviceId);
            if (found) setSelectedDetailService(found);
          }}
        />

        {/* Master Stylists / Specialists */}
        <StylistsSection
          onSelectStylistForBooking={(stylist) => handleOpenBooking(undefined, stylist.id)}
        />

        {/* Integrated User Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
          onUpvoteReview={handleUpvoteReview}
        />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Responsive Mobile Bottom Floating Quick Booking Bar (Cap <= 15% viewport) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-between gap-2 shadow-xl">
        <a
          href="tel:8630976072"
          className="inline-flex items-center justify-center p-2 text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 border border-stone-300"
          title="Call 8630976072"
        >
          <Phone className="w-4 h-4 text-amber-800" />
        </a>

        <a
          href={PARLOUR_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-xs"
          title="WhatsApp 8630976072"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {activeBookingsCount > 0 && (
          <button
            onClick={() => setIsMyBookingsOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-800" />
            <span>({activeBookingsCount})</span>
          </button>
        )}

        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-stone-900 rounded-lg shadow-sm hover:bg-stone-800"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Booking System Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={preSelectedServiceId}
        initialStylistId={preSelectedStylistId}
        onBookingConfirmed={handleBookingConfirmed}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* My Bookings Manager Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onRescheduleBooking={handleRescheduleBooking}
        onOpenNewBooking={() => handleOpenBooking()}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedDetailService}
        onClose={() => setSelectedDetailService(null)}
        onBookService={(service) => handleOpenBooking(service.id)}
      />
    </div>
  );
}
