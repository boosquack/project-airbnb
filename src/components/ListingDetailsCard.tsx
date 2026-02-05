import { DollarSign, Pin, Users } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '@/components/AuthProvider';
import { BookingForm } from '@/components/booking';
import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import {
  ReviewForm,
  ReviewList,
  StarRatingDisplay,
} from '@/components/reviews';
import { Card, Separator } from '@/components/ui';
import type { ListingWithLocation } from '@/types';
import type { AppDispatch, RootState } from '@/state/store';
import { fetchReviews } from '@/state/reviews/reviewsSlice';

interface ListingDetailsCardProps {
  listing?: ListingWithLocation;
}

const ListingDetailsCard = ({ listing }: ListingDetailsCardProps) => {
  if (!listing) {
    return null;
  }
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { reviews, status } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    if (listing?.id) {
      dispatch(fetchReviews(listing.id));
    }
  }, [dispatch, listing?.id]);

  const { averageRating, userReview, users } = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return {
        averageRating: listing?.rating || 0,
        userReview: null,
        users: [],
      };
    }

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avg = total / reviews.length;

    const existingReview = user
      ? reviews.find((r) => r.userId === user.id)
      : null;

    const usersList = user ? [user] : [];

    return {
      averageRating: avg,
      userReview: existingReview || null,
      users: usersList,
    };
  }, [reviews, user, listing?.rating]);

  const handleReviewSuccess = () => {
    dispatch(fetchReviews(listing.id));
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <Card className="flex-1 p-4">
        <ListingDetailsCardImages listing={listing} />
        <Separator className="my-4" />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-2xl font-bold">{listing.name}</h1>
              <StarRatingDisplay rating={averageRating} size="lg" />
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                <span className="font-bold text-foreground">
                  {listing.price}
                </span>{' '}
                / night
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Pin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {listing.location.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {listing.maxGuests} Guests
              </span>
            </div>
          </div>
          <ListingFavoriteButton listing={listing} />
        </div>
        <Separator className="my-4" />
        <div className="whitespace-pre-line">{listing.description}</div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-6">
          <ReviewList
            reviews={reviews}
            users={users}
            isLoading={status === 'loading'}
            averageRating={averageRating}
            totalReviews={reviews?.length || 0}
          />
          <Separator />
          <ReviewForm
            listingId={listing.id}
            existingReview={userReview}
            onSuccess={handleReviewSuccess}
          />
        </div>
      </Card>
      <div className="lg:sticky lg:top-4 lg:self-start">
        <BookingForm listing={listing} />
      </div>
    </div>
  );
};

export default ListingDetailsCard;
