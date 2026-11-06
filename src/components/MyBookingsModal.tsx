import { useState } from 'react';
import { X, Calendar, Clock, User, Trash2, RefreshCw, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Booking } from '../types';
import { AVAILABLE_TIME_SLOTS } from '../data/parlourData';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onRescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  onOpenNewBooking: () => void;
}

export function MyBookingsModal({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onRescheduleBooking,
  onOpenNewBooking,
}: MyBookingsModalProps) {
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState(AVAILABLE_TIME_SLOTS[0]);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartReschedule = (booking: Booking) => {
    setReschedulingId(booking.id);
    setRescheduleDate(booking.date);
    setRescheduleTime(booking.timeSlot);
  };

  const handleSaveReschedule = (bookingId: string) => {
    if (!rescheduleDate || !rescheduleTime) return;
    onRescheduleBooking(bookingId, rescheduleDate, rescheduleTime);
    setReschedulingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              My Scheduled Appointments
            </h3>
            <p className="text-xs text-stone-500">
              Manage your upcoming visits, reschedule, or review booking details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {bookings.length > 0 ? (
            bookings.map((booking) => {
              const isRescheduling = reschedulingId === booking.id;
              const isCancelling = cancelConfirmId === booking.id;

              return (
                <div
                  key={booking.id}
                  className={`p-5 rounded-xl border transition-all ${
                    booking.status === 'cancelled'
                      ? 'bg-stone-100/50 border-stone-200 opacity-60'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                          {booking.id}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                            booking.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : booking.status === 'rescheduled'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-stone-900 mt-1.5">
                        {booking.serviceNames.join(' + ')}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-stone-900">
                        ₹{booking.totalPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-stone-400">Pay at salon</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{booking.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>Stylist: {booking.stylistName}</span>
                    </div>
                    <div className="text-stone-400">
                      Guest: {booking.clientName} ({booking.clientPhone})
                    </div>
                  </div>

                  {/* Reschedule View */}
                  {isRescheduling && (
                    <div className="mt-3 p-3.5 bg-white border border-amber-300 rounded-lg space-y-3">
                      <div className="text-xs font-semibold text-stone-900">
                        Choose New Date & Slot:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={rescheduleDate}
                          onChange={(e) => setRescheduleDate(e.target.value)}
                          className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-md bg-stone-50"
                        />
                        <select
                          value={rescheduleTime}
                          onChange={(e) => setRescheduleTime(e.target.value)}
                          className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-md bg-stone-50"
                        >
                          {AVAILABLE_TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setReschedulingId(null)}
                          className="px-3 py-1 text-xs text-stone-600 hover:text-stone-900"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveReschedule(booking.id)}
                          className="px-3 py-1 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-md"
                        >
                          Confirm Reschedule
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Cancel Confirmation View */}
                  {isCancelling && (
                    <div className="mt-3 p-3.5 bg-rose-50 border border-rose-200 rounded-lg space-y-2 text-xs text-rose-900">
                      <div className="flex items-center gap-2 font-semibold">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Are you sure you want to cancel this booking?</span>
                      </div>
                      <p className="text-[11px] text-rose-700">
                        Your reserved styling suite and artist slot will be released back to the general calendar.
                      </p>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => setCancelConfirmId(null)}
                          className="px-3 py-1 text-xs text-stone-600 bg-white border border-stone-200 rounded-md"
                        >
                          Keep Appointment
                        </button>
                        <button
                          onClick={() => {
                            onCancelBooking(booking.id);
                            setCancelConfirmId(null);
                          }}
                          className="px-3 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md"
                        >
                          Yes, Cancel Booking
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions Row */}
                  {!isRescheduling && !isCancelling && booking.status !== 'cancelled' && (
                    <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center justify-end gap-3 text-xs">
                      <button
                        onClick={() => handleStartReschedule(booking)}
                        className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900"
                      >
                        <RefreshCw className="w-3 h-3 text-amber-700" />
                        <span>Reschedule</span>
                      </button>

                      <button
                        onClick={() => setCancelConfirmId(booking.id)}
                        className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-800"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h4 className="text-base font-semibold text-stone-800">
                No active appointments found
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                You haven't scheduled any beauty treatments yet. Pick a service and reserve your suite today!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewBooking();
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm"
              >
                <span>Book First Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Assistance: <a href="tel:8630976072" className="font-semibold text-stone-800 hover:text-amber-800 font-mono">8630976072</a>
          </span>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
