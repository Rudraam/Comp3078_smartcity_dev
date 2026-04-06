import { useState, useEffect } from "react";
import { Star, Trash2, MessageSquare, Loader2, LogIn, AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "../../hooks/router-compat";

interface Review {
  id: string;
  userId: string;
  username: string;
  placeId: string;
  placeType: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  placeId: string;
  placeName?: string;
  placeType: "restaurant" | "hotel";
}

const LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

function StarRating({
  value,
  onChange,
  readOnly,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md";
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  const dim = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <div
      className="flex gap-0.5"
      aria-label={readOnly ? `${value} out of 5 stars` : "Select a star rating"}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          aria-label={readOnly ? undefined : `Rate ${star} star${star !== 1 ? "s" : ""}`}
          className={`${readOnly ? "cursor-default" : "cursor-pointer hover:scale-125"} transition-transform focus:outline-none`}
          tabIndex={readOnly ? -1 : 0}
        >
          <Star
            className={`${dim} transition-colors ${
              active >= star
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-400 fill-transparent"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function communityAvg(reviews: Review[]): number | null {
  if (!reviews.length) return null;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export function ReviewSection({ placeId, placeName, placeType }: ReviewSectionProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<{ msg: string; sessionExpired?: boolean } | null>(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const loadReviews = () => {
    setLoading(true);
    fetch(`/api/reviews?placeId=${encodeURIComponent(placeId)}&placeType=${encodeURIComponent(placeType)}`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReviews();
  }, [placeId, placeType]);

  const myReview = user ? reviews.find((r) => r.userId === user.id) : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError({ msg: "Please select a star rating before submitting." });
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const resp = await fetch("/api/reviews", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId, placeName: placeName || placeId, placeType, rating, comment }),
      });
      if (resp.status === 401) {
        setError({ msg: "Your session has expired. Please sign in again to submit a review.", sessionExpired: true });
        return;
      }
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        setError({ msg: err.error || "Failed to submit review. Please try again." });
        return;
      }
      const newReview = await resp.json();
      setReviews((prev) => [newReview, ...prev]);
      setRating(0);
      setComment("");
    } catch {
      setError({ msg: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const resp = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (resp.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const avg = communityAvg(reviews);

  return (
    <div className="border-t border-[var(--app-border)] mt-6 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="font-semibold text-[var(--app-text)] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#1152d4]" aria-hidden="true" />
          Community Ratings
        </h3>
        {avg !== null ? (
          <div className="flex items-center gap-3 bg-[var(--app-card)] px-4 py-2 rounded-xl">
            <div className="text-right">
              <p className="text-xs text-[var(--app-text-muted)] leading-none mb-1">Community Avg</p>
              <p className="text-xl font-bold text-[var(--app-text)] leading-none">{avg.toFixed(1)}</p>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <StarRating value={Math.round(avg)} readOnly size="sm" />
              <p className="text-xs text-[var(--app-text-muted)]">{reviews.length} user review{reviews.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        ) : !loading ? (
          <p className="text-xs text-[var(--app-text-muted)]">No user ratings yet</p>
        ) : null}
      </div>

      {!user ? (
        <div className="bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-xl px-4 py-4 flex flex-wrap items-center justify-between gap-3 mb-5">
          <p className="text-sm text-[var(--app-text-muted)]">Sign in to write a review</p>
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-[#1152d4] text-white hover:bg-[#0e44b0] transition-colors shrink-0"
          >
            <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
            Sign in
          </button>
        </div>
      ) : loading ? null : !myReview ? (
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-xl p-4 mb-5 space-y-3"
        >
          <p className="text-sm font-medium text-[var(--app-text)]">
            Review as{" "}
            <span className="text-[#5281e0] font-semibold">{user.username}</span>
          </p>

          <div className="flex items-center gap-3 py-1">
            <StarRating value={rating} onChange={setRating} />
            <span
              className={`text-sm font-medium transition-colors ${
                rating > 0 ? "text-yellow-500" : "text-[var(--app-text-muted)]"
              }`}
            >
              {rating > 0 ? LABELS[rating] : "Click a star to rate"}
            </span>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-red-400">{error.msg}</p>
                {error.sessionExpired && (
                  <button
                    type="button"
                    onClick={() => navigate("/auth")}
                    className="mt-1 text-xs text-[#5281e0] hover:text-[#1152d4] flex items-center gap-1 transition-colors"
                  >
                    <LogIn className="w-3 h-3" aria-hidden="true" />
                    Sign in again
                  </button>
                )}
              </div>
            </div>
          )}

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (optional)…"
            rows={3}
            maxLength={1000}
            className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-lg px-3 py-2 text-sm text-[var(--app-text)] placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[#1152d4] resize-none transition-colors"
          />

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-[var(--app-text-muted)]">{comment.length}/1000</span>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1152d4] text-white text-sm font-semibold hover:bg-[#0e44b0] active:bg-[#0a3590] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : null}
              {submitting ? "Submitting…" : "Submit Review"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-[#1152d4]/5 border border-[#1152d4]/20 rounded-xl px-4 py-3 mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CheckBadge />
            <div>
              <p className="text-xs text-[var(--app-text-muted)]">Your review</p>
              <StarRating value={myReview.rating} readOnly size="sm" />
            </div>
          </div>
          <button
            onClick={() => handleDelete(myReview.id)}
            disabled={deleting === myReview.id}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
          >
            {deleting === myReview.id ? (
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 className="w-3 h-3" aria-hidden="true" />
            )}
            Delete
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#1152d4]" aria-label="Loading reviews" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="w-8 h-8 text-[var(--app-text-muted)] mx-auto mb-2 opacity-40" aria-hidden="true" />
          <p className="text-sm text-[var(--app-text-muted)]">No community reviews yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full bg-[#1152d4]/10 flex items-center justify-center text-[#5281e0] text-xs font-bold shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {review.username[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[var(--app-text)]">{review.username}</span>
                    <StarRating value={review.rating} readOnly size="sm" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--app-text-muted)]">
                      {new Date(review.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {user?.id === review.userId && (
                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={deleting === review.id}
                        className="text-[var(--app-text-muted)] hover:text-red-400 transition-colors disabled:opacity-50"
                        aria-label="Delete your review"
                      >
                        {deleting === review.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {review.comment && (
                  <p className="text-sm text-[var(--app-text-muted)] leading-relaxed">{review.comment}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CheckBadge() {
  return (
    <div className="w-7 h-7 rounded-full bg-[#1152d4]/15 flex items-center justify-center">
      <svg className="w-4 h-4 text-[#5281e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}
