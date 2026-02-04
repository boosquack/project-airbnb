import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextArea } from '@/components/ui';
import {
  createReview,
  updateReview,
  deleteReview,
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus,
} from '@/state/reviews/reviewsSlice';

import { StarRating } from './StarRating';

const ReviewForm = ({ listingId, existingReview, onSuccess }) => {
  const dispatch = useDispatch();
  const { createStatus, updateStatus, deleteStatus } = useSelector(
    (state) => state.reviews
  );

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [error, setError] = useState('');

  const isEditing = !!existingReview;
  const isSubmitting = createStatus === 'loading' || updateStatus === 'loading';
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

  const handleSubmit = (e) => {
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

    if (isEditing) {
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
    if (existingReview && window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(existingReview.id));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">
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
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
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
          >
            {isDeleting ? 'Deleting...' : 'Delete Review'}
          </Button>
        )}
      </div>
    </form>
  );
};

export { ReviewForm };
