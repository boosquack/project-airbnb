import { Star } from 'lucide-react';

import { Spinner } from '@/components/ui';
import type { CleanUser, Review } from '@/types';

import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  users?: CleanUser[];
  isLoading: boolean;
  averageRating?: number;
  totalReviews: number;
}

const ReviewList = ({
  reviews,
  users,
  isLoading,
  averageRating,
  totalReviews,
}: ReviewListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const getUserForReview = (userId: number): Partial<CleanUser> => {
    return (
      users?.find((u) => u.id === userId) || {
        firstName: 'Guest',
        lastName: '',
        initials: 'G',
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="text-lg font-semibold">
          {averageRating?.toFixed(1) || '0.0'}
        </span>
        <span className="text-muted-foreground">
          ({totalReviews || 0} {totalReviews === 1 ? 'review' : 'reviews'})
        </span>
      </div>

      {reviews && reviews.length > 0 ? (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              user={getUserForReview(review.userId)}
            />
          ))}
        </div>
      ) : (
        <p className="py-4 text-muted-foreground">
          No reviews yet. Be the first to review this listing!
        </p>
      )}
    </div>
  );
};

export { ReviewList };
