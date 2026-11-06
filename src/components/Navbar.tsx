import { useState } from 'react';
import { Calendar, Menu, X, Sparkles } from 'lucide-react';
import { Booking } from '../types';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
  bookings: Booking[];
}

export function Navbar({ onOpenBooking, onOpenMyBookings, bookings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand wordmark (single text element wordmark as per Top Bar Contract) */}
          <a
            href="#"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              Nayasha
            </span>
            <span className="text-xs tracking-widest uppercase font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200 hidden sm:inline-block">
              Beauty Parlour
            </span>
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a
              href="#specialties"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 font-semibold text-amber-800"
            >
              Hair Cut & Makeup
            </a>
            <a
              href="#services"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              All Services
            </a>
            <a
              href="#gallery"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Style Lookbook
            </a>
            <a
              href="#reviews"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Guest Reviews
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Phone booking button */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="tel:8630976072"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-amber-50 hover:border-amber-400 transition-colors whitespace-nowrap shrink-0 font-mono"
              title="Call directly to book appointment"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>8630976072</span>
            </a>

            {activeBookingsCount > 0 && (
              <button
                onClick={onOpenMyBookings}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0"
                title="View your scheduled appointments"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>My Bookings ({activeBookingsCount})</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 active:scale-98 transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-stone-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Services Menu
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Style Gallery Lookbook
            </a>
            <a
              href="#stylists"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Master Artists & Specialists
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Verified Client Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-800 py-1"
            >
              Studio Location & Timings
            </a>
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            {activeBookingsCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-stone-800 bg-white border border-stone-300 rounded-lg"
              >
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>View My Appointments ({activeBookingsCount})</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book Appointment Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
