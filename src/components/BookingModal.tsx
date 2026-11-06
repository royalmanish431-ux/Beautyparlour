import { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Clock,
  Calendar as CalendarIcon,
  User,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Download,
  Phone,
  Mail,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Service, Stylist, Booking } from '../types';
import { PARLOUR_SERVICES, PARLOUR_STYLISTS, AVAILABLE_TIME_SLOTS, PARLOUR_INFO } from '../data/parlourData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialStylistId?: string;
  onBookingConfirmed: (booking: Booking) => void;
  onOpenMyBookings: () => void;
}

export function BookingModal({
  isOpen,
  onClose,
  initialServiceId,
  initialStylistId,
  onBookingConfirmed,
  onOpenMyBookings,
}: BookingModalProps) {
  // Steps: 1: Service Selection, 2: Stylist, 3: Date & Time, 4: Client Details, 5: Confirmed
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Selections
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Initialize service & dates
  useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        setSelectedServiceIds([initialServiceId]);
      } else if (selectedServiceIds.length === 0) {
        setSelectedServiceIds([PARLOUR_SERVICES[0].id]);
      }

      if (initialStylistId) {
        setSelectedStylistId(initialStylistId);
      }

      // Generate default dates (today + 14 days)
      const dates = getNextDays(14);
      if (dates.length > 0 && !selectedDate) {
        setSelectedDate(dates[0].dateString);
      }
      if (!selectedTime) {
        setSelectedTime(AVAILABLE_TIME_SLOTS[1]);
      }
    }
  }, [isOpen, initialServiceId, initialStylistId]);

  if (!isOpen) return null;

  // Helper for dates
  function getNextDays(count: number) {
    const days = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isToday = i === 0;
      const isTomorrow = i === 1;
      const dayName = isToday ? 'Today' : isTomorrow ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dateNum = d.getDate();
      const dateString = d.toISOString().split('T')[0];
      days.push({ dayName, monthName, dateNum, dateString });
    }
    return days;
  }

  const calendarDays = getNextDays(10);

  // Computed calculations
  const selectedServices = PARLOUR_SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const totalDurationMinutes = selectedServices.reduce((sum, s) => {
    const parsed = parseInt(s.duration);
    return sum + (isNaN(parsed) ? 60 : parsed);
  }, 0);

  const selectedStylist =
    selectedStylistId === 'any'
      ? { name: 'Any Available Master Specialist' }
      : PARLOUR_STYLISTS.find((st) => st.id === selectedStylistId) || {
          name: 'Any Available Master Specialist',
        };

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter((sId) => sId !== id));
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const newBooking: Booking = {
      id: `AUR-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceIds: selectedServiceIds,
      serviceNames: selectedServices.map((s) => s.name),
      totalPrice,
      stylistId: selectedStylistId,
      stylistName: selectedStylist.name,
      date: selectedDate,
      timeSlot: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      notes: clientNotes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setCurrentStep(5);
  };

  // Generate .ics calendar download
  const handleDownloadCalendarEvent = () => {
    if (!confirmedBooking) return;
    const [year, month, day] = confirmedBooking.date.split('-').map(Number);
    // Parse time slot, e.g. "11:15 AM"
    const [timeStr, meridiem] = confirmedBooking.timeSlot.split(' ');
    let [hour, minute] = timeStr.split(':').map(Number);
    if (meridiem === 'PM' && hour < 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;

    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + totalDurationMinutes * 60000);

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const formatICSDate = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aura Luxe Salon//Beauty Appointment//EN',
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.id}@auraluxesalon.com`,
      `DTSTAMP:${formatICSDate(new Date())}Z`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:Aura Luxe Appointment - ${confirmedBooking.serviceNames.join(', ')}`,
      `DESCRIPTION:Appointment at Aura Luxe for ${confirmedBooking.serviceNames.join(', ')} with ${confirmedBooking.stylistName}. Booking Ref: ${confirmedBooking.id}`,
      `LOCATION:${PARLOUR_INFO.address}, ${PARLOUR_INFO.city}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AuraLuxe-Appointment-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-stone-900">
              Online Appointment Concierge
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-amber-800 font-semibold">Nayasha Beauty Parlour</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 4 only) */}
        {currentStep < 5 && (
          <div className="px-6 py-3 bg-stone-100/60 border-b border-stone-200/80 flex items-center justify-between text-xs font-medium text-stone-500">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
              <span className={currentStep === 1 ? 'text-amber-800 font-semibold' : ''}>
                1. Treatments
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className={currentStep === 2 ? 'text-amber-800 font-semibold' : ''}>
                2. Specialist
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className={currentStep === 3 ? 'text-amber-800 font-semibold' : ''}>
                3. Date & Time
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className={currentStep === 4 ? 'text-amber-800 font-semibold' : ''}>
                4. Details
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1 font-mono text-stone-700 font-semibold">
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              <span className="text-stone-400 font-normal">({totalDurationMinutes}m)</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: SELECT SERVICES */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Select Your Desired Treatments
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Choose one or combine multiple services for a complete beauty pampering session.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {PARLOUR_SERVICES.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50/50 shadow-xs ring-1 ring-amber-700/30'
                          : 'border-stone-200 bg-stone-50/60 hover:bg-stone-50 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-medium text-amber-800 uppercase tracking-wide">
                            {service.categoryLabel}
                          </span>
                          <span className="text-xs text-stone-500 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-stone-400" />
                            {service.duration}
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-stone-900 mt-1">
                          {service.name}
                        </h4>

                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-200/70 flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-stone-900">
                          ₹{service.price.toLocaleString('en-IN')}
                        </span>

                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-amber-800 text-white'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {isSelected ? 'Selected' : '+ Add'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE SPECIALIST */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Select Your Preferred Artist
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select a specialist or let our reception assign the next available master artist.
                </p>
              </div>

              <div className="space-y-3">
                {/* Any Available Option */}
                <div
                  onClick={() => setSelectedStylistId('any')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedStylistId === 'any'
                      ? 'border-amber-700 bg-amber-50/60 ring-1 ring-amber-700/30'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-stone-800 text-white flex items-center justify-center font-serif text-sm">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900">
                        Any Available Master Specialist
                      </h4>
                      <p className="text-xs text-stone-500">
                        Fastest availability — matched with the ideal specialist for your treatments.
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded ${
                      selectedStylistId === 'any'
                        ? 'bg-amber-800 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {selectedStylistId === 'any' ? 'Selected' : 'Choose'}
                  </span>
                </div>

                {/* Specific Stylists */}
                {PARLOUR_STYLISTS.map((st) => {
                  const isSelected = selectedStylistId === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStylistId(st.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50/60 ring-1 ring-amber-700/30'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-amber-900 text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                          {st.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-stone-900">
                              {st.name}
                            </h4>
                            <span className="text-xs text-amber-800 font-mono">★ {st.rating}</span>
                          </div>
                          <p className="text-xs text-stone-500">
                            {st.role} · {st.experience}
                          </p>
                          <p className="text-[11px] text-stone-400 mt-0.5">
                            Specialty: {st.specialty}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded ${
                          isSelected
                            ? 'bg-amber-800 text-white'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Choose'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME PICKER */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Select Date & Appointment Time
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Our private suites maintain a 15-minute sanitization buffer between appointments.
                </p>
              </div>

              {/* Horizontal Date Picker */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Preferred Date
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {calendarDays.map((d) => {
                    const isSelected = selectedDate === d.dateString;
                    return (
                      <button
                        key={d.dateString}
                        type="button"
                        onClick={() => setSelectedDate(d.dateString)}
                        className={`flex flex-col items-center justify-center min-w-[70px] py-3 px-2 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-amber-700 bg-stone-900 text-white shadow-md'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span className="text-[11px] font-medium uppercase opacity-80">
                          {d.dayName}
                        </span>
                        <span className="text-xl font-bold font-mono my-0.5">
                          {d.dateNum}
                        </span>
                        <span className="text-[10px] opacity-70">{d.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Available Time Slots ({selectedDate})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {AVAILABLE_TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                          isSelected
                            ? 'border-amber-700 bg-amber-800 text-white shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: GUEST DETAILS & CONFIRMATION FORM */}
          {currentStep === 4 && (
            <form id="booking-details-form" onSubmit={handleCompleteBooking} className="space-y-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Guest Contact Information
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  We'll send your booking confirmation code and calendar invite via SMS / WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Deepika Singhania"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address (for calendar sync)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="deepika@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Special Notes or Allergies (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="e.g., Sensitive scalp, bridal trial inquiry, natural herbal products preferred..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="whatsappConsent"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                  className="w-4 h-4 text-amber-800 rounded border-stone-300 focus:ring-amber-700"
                />
                <label htmlFor="whatsappConsent" className="text-xs text-stone-600">
                  Send instant booking reminder and salon location link via WhatsApp
                </label>
              </div>

              {/* Order summary box */}
              <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 text-xs space-y-1.5">
                <div className="font-semibold text-stone-800 uppercase tracking-wide text-[11px]">
                  Appointment Summary
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Selected Treatments:</span>
                  <span className="font-medium text-stone-900 text-right">
                    {selectedServices.map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Stylist:</span>
                  <span className="font-medium text-stone-900">{selectedStylist.name}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Date & Slot:</span>
                  <span className="font-medium text-stone-900">
                    {selectedDate} at {selectedTime}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                  <span>Total Amount (Pay at Salon):</span>
                  <span className="font-mono">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: BOOKING SUCCESS SCREEN */}
          {currentStep === 5 && confirmedBooking && (
            <div className="py-4 space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-800">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                  We look forward to pampering you, {confirmedBooking.clientName}!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                  Your appointment has been reserved in our system. A confirmation notification has been prepared for {confirmedBooking.clientPhone}.
                </p>
              </div>

              {/* Confirmation Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-xs text-stone-500">Booking Reference</span>
                  <span className="font-mono text-sm font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">
                    {confirmedBooking.id}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-stone-600">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Date & Time:</span>
                    <span className="font-semibold text-stone-900">
                      {confirmedBooking.date} at {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Stylist:</span>
                    <span className="font-semibold text-stone-900">
                      {confirmedBooking.stylistName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Services:</span>
                    <span className="font-semibold text-stone-900 text-right">
                      {confirmedBooking.serviceNames.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Location:</span>
                    <span className="font-semibold text-stone-900 text-right">
                      {PARLOUR_INFO.address}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                    <span>Total Due at Studio:</span>
                    <span className="font-mono">₹{confirmedBooking.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Direct Contact Assist Bar */}
                <div className="mt-4 pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                  <div className="text-xs text-stone-700 text-left">
                    <span className="font-semibold text-stone-900">Need instant help?</span> Call or WhatsApp Nayasha reception on{' '}
                    <span className="font-bold text-amber-900 font-mono">8630976072</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href="tel:8630976072"
                      className="px-2.5 py-1 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-md hover:bg-stone-50"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/918630976072?text=Hello%20Nayasha,%20I%20have%20confirmed%20Booking%20Ref%20${confirmedBooking.id}%20for%20${confirmedBooking.date}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendarEvent}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>Download .ICS Calendar Event</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenMyBookings();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                >
                  <CalendarIcon className="w-4 h-4 text-amber-300" />
                  <span>View in My Appointments</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Navigation (Steps 1-4) */}
        {currentStep < 5 && (
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-xs"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-details-form"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Confirm & Reserve Appointment</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
