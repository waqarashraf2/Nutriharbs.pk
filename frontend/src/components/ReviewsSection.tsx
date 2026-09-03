'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, UserCheck } from 'lucide-react';
import { REVIEWS } from '@/lib/products-data';

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    city: '',
    title: '',
    comment: '',
    rating: 5
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;

    const reviewToAdd = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      city: newReview.city || 'Pakistan',
      rating: newReview.rating,
      date: 'Just now',
      title: newReview.title || 'Exceptional Quality',
      comment: newReview.comment,
      verified: true,
      helpfulCount: 1
    };

    setReviewsList([reviewToAdd, ...reviewsList]);
    setShowModal(false);
    setNewReview({ author: '', city: '', title: '', comment: '', rating: 5 });
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-[#5BB318] uppercase tracking-wider">
              Real Pakistani Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Customer Transformation Stories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Over 10,000+ verified Pakistani customers have boosted their energy, stopped hair fall, and improved joint flexibility.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#F4F9F4] p-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
              <div className="text-2xl font-black text-[#1B4D3E]">4.9</div>
              <div className="text-left">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 font-bold mt-0.5">Based on 1,420+ reviews</div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-[#1B4D3E] hover:bg-[#13382D] text-white px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.map((review) => (
            <div 
              key={review.id}
              className="bg-[#F4F9F4]/60 p-5 rounded-2xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400">{review.date}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 mb-1.5">
                  &ldquo;{review.title}&rdquo;
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {review.comment}
                </p>
              </div>

              {/* Author & City */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {review.author}
                    {review.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5BB318]" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">{review.city}</div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold bg-white px-2 py-1 rounded-md border border-slate-100">
                  <ThumbsUp className="w-3 h-3 text-emerald-600" />
                  <span>{review.helpfulCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-slate-900">Share Your Nutriherbs Experience</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#1B4D3E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Karachi (Clifton)"
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#1B4D3E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Star Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#1B4D3E] focus:outline-none bg-white"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Review Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Visible change in hair fall in 10 days"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#1B4D3E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Detailed Feedback</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about how Nutriherbs helped your wellness goals..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#1B4D3E] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-lg text-slate-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1B4D3E] text-white rounded-lg font-bold hover:bg-[#13382D]"
                  >
                    Post Verified Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
