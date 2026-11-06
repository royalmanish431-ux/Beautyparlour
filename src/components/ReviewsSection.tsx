import { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, X, ShieldCheck } from 'lucide-react';
import { Review, Service } from '../types';
import { PARLOUR_SERVICES } from '../data/parlourData';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'avatarBg'>) => void;
  onUpvoteReview: (reviewId: string) => void;
}

export function ReviewsSection({ reviews, onAddReview, onUpvoteReview }: ReviewsSectionProps) {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formService, setFormService] = useState(PARLOUR_SERVICES[0].name);
  const [formComment, setFormComment] = useState('');
  const [formSubmittedToast, setFormSubmittedToast] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
  ).toFixed(2);

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;
  const threeStarCount = reviews.filter((r) => r.rating <= 3).length;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    onAddReview({
      authorName: formName.trim(),
      authorCity: formCity.trim() || 'New Delhi',
      rating: formRating,
      serviceTitle: formService,
      comment: formComment.trim(),
      verified: true,
    });

    setFormName('');
    setFormCity('');
    setFormComment('');
    setFormRating(5);
    setWriteModalOpen(false);

    setFormSubmittedToast(true);
    setTimeout(() => setFormSubmittedToast(false), 4000);
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toast notification */}
        {formSubmittedToast && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Thank you! Your verified review has been published to our guest book.</span>
            </div>
            <button
              onClick={() => setFormSubmittedToast(false)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-800 mb-2">
              Guest Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Verified Client Reviews & Stories
            </h2>
            <p className="text-stone-600 mt-2 max-w-xl text-sm sm:text-base">
              Real reflections from brides, executives, and guests who entrust their hair, skin, and celebrations to Aura Luxe.
            </p>
          </div>

          <button
            onClick={() => setWriteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 hover:border-stone-400 transition-colors shadow-xs whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-700" />
            <span>Write a Guest Review</span>
          </button>
        </div>

        {/* Ratings Overview Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-sm">
          {/* Overall score */}
          <div className="lg:col-span-4 flex flex-col justify-center items-start border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
            <div className="text-5xl sm:text-6xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              {averageRating}
            </div>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 text-amber-500 fill-amber-400"
                />
              ))}
            </div>
            <div className="text-xs text-stone-500">
              Based on <span className="font-semibold text-stone-800">{totalReviews} published</span> verified guest ratings
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine Guest Feedback</span>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-2.5">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-stone-600 font-medium">5 Stars</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(fiveStarCount / totalReviews) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right text-stone-500 font-mono tabular-nums">
                {Math.round((fiveStarCount / totalReviews) * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-stone-600 font-medium">4 Stars</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${(fourStarCount / totalReviews) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right text-stone-500 font-mono tabular-nums">
                {Math.round((fourStarCount / totalReviews) * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-stone-600 font-medium">3 Stars</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-300 rounded-full"
                  style={{ width: `${(threeStarCount / totalReviews) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right text-stone-500 font-mono tabular-nums">
                {Math.round((threeStarCount / totalReviews) * 100)}%
              </span>
            </div>

            {/* Filter buttons */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-stone-400 font-medium">Filter:</span>
              <button
                onClick={() => setFilterRating('all')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  filterRating === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                All ({reviews.length})
              </button>
              <button
                onClick={() => setFilterRating(5)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  filterRating === 5
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                5 Stars only ({fiveStarCount})
              </button>
              {fourStarCount > 0 && (
                <button
                  onClick={() => setFilterRating(4)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    filterRating === 4
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  4 Stars ({fourStarCount})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-stone-300 transition-all"
            >
              <div>
                {/* Author Info & Star Rating */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${review.avatarBg}`}
                    >
                      {review.authorName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                        <span>{review.authorName}</span>
                        {review.verified && (
                          <span title="Verified Guest">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-400">
                        {review.authorCity} · {review.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-stone-200 fill-stone-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Service received tag */}
                <div className="text-xs font-medium text-amber-800 mb-2.5">
                  Service: {review.serviceTitle}
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Helpful footer */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span>Verified Studio Visit</span>

                <button
                  onClick={() => onUpvoteReview(review.id)}
                  className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 transition-colors p-1 rounded hover:bg-stone-50"
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="font-mono tabular-nums">{review.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setWriteModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Share Your Experience
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Your authentic feedback helps other guests discover their perfect beauty treatments.
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= formRating
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-stone-200 fill-stone-100'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-medium text-stone-600">
                    {formRating === 5 ? '5 - Exceptional' : `${formRating} Stars`}
                  </span>
                </div>
              </div>

              {/* Service Availed */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Treatment / Service Received
                </label>
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                >
                  {PARLOUR_SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name and City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City / Neighborhood
                  </label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="e.g. Greater Kailash"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Review & Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Tell us about the atmosphere, the stylist's skill, the hygiene, and the final result..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setWriteModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-amber-800 rounded-lg transition-colors shadow-sm"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
