import { Lock, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import { Button, TextArea } from '@/components/ui';
import type { Review } from '@/types';
import type { AppDispatch, RootState } from '@/state/store';
import {
  createReview,
  updateReview,
  deleteReview,
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus,
} from '@/state/reviews/reviewsSlice';

import { StarRating } from './StarRating';

interface ReviewFormProps {
  listingId: number;
  existingReview?: Review | null;
  onSuccess?: () => void;
}

const ReviewForm = ({
  listingId,
  existingReview,
  onSuccess,
}: ReviewFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { token } = useAuth();
  const { createStatus, updateStatus, deleteStatus } = useSelector(
    (state: RootState) => state.reviews
  );

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [error, setError] = useState('');

  const isAuthenticated = !!token;
  const isEditing = !!existingReview;
  const isSubmitting =
    createStatus === 'loading' || updateStatus === 'loading';
  const isDeleting = deleteStatus === 'loading';

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    }
  }, [existingReview]);

  useEffect(() => {
    if (createStatus === 'succeeded' || updateStatus === 'succeeded') {
      setRating(0);
      setComment('');
      setError('');
      dispatch(resetCreateStatus());
      dispatch(resetUpdateStatus());
      onSuccess?.();
    }
  }, [createStatus, updateStatus, dispatch, onSuccess]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      dispatch(resetDeleteStatus());
      onSuccess?.();
    }
  }, [deleteStatus, dispatch, onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }

    if (isEditing && existingReview) {
      dispatch(
        updateReview({
          id: existingReview.id,
          rating,
          comment: comment.trim(),
        })
      );
    } else {
      dispatch(
        createReview({
          listingId: Number(listingId),
          rating,
          comment: comment.trim(),
        })
      );
    }
  };

  const handleDelete = () => {
    if (
      existingReview &&
      window.confirm('Are you sure you want to delete this review?')
    ) {
      dispatch(deleteReview(existingReview.id));
    }
  };

  // Show sign-in prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-border p-6 bg-muted/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold font-display mb-2">Share your experience</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sign in to write a review and help others discover great places to stay.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-background text-sm text-muted-foreground mb-4">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <span>You need to be signed in to leave a review</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link to={`/signin?redirect=${encodeURIComponent(location.pathname)}`}>
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to={`/signup?redirect=${encodeURIComponent(location.pathname)}`}>
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold font-display">
        {isEditing ? 'Edit your review' : 'Write a review'}
      </h3>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Your rating</label>
        <StarRating value={rating} onChange={setRating} disabled={isSubmitting} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="comment" className="text-sm font-medium">
          Your review
        </label>
        <TextArea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this listing..."
          disabled={isSubmitting}
          rows={4}
          className="resize-none"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="rounded-full">
          {isSubmitting
            ? 'Submitting...'
            : isEditing
              ? 'Update Review'
              : 'Submit Review'}
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-full"
          >
            {isDeleting ? 'Deleting...' : 'Delete Review'}
          </Button>
        )}
      </div>
    </form>
  );
};

export { ReviewForm };
