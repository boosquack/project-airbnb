import { MapPin, Star, Users } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '@/components/AuthProvider';
import { BookingForm } from '@/components/booking';
import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import {
  ReviewForm,
  ReviewList,
} from '@/components/reviews';
import { Separator } from '@/components/ui';
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
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Images */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <ListingDetailsCardImages listing={listing} />
            </div>

            {/* Listing Info */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 lg:p-8 mb-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-display font-semibold tracking-tight mb-3">
                    {listing.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{listing.location.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{listing.maxGuests} guests max</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-star text-star" />
                      <span className="font-medium text-foreground">{averageRating.toFixed(1)}</span>
                      <span>({reviews?.length || 0} reviews)</span>
                    </div>
                  </div>
                </div>
                <ListingFavoriteButton listing={listing} />
              </div>

              <Separator className="my-6" />

              {/* Price highlight for mobile */}
              <div className="lg:hidden mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-display font-semibold">${listing.price}</span>
                  <span className="text-muted-foreground">/ night</span>
                </div>
                <p className="text-sm text-muted-foreground">Scroll down to book this property</p>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold font-display mb-4">About this place</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
                  {listing.description}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 lg:p-8">
              <ReviewList
                reviews={reviews}
                users={users}
                isLoading={status === 'loading'}
                averageRating={averageRating}
                totalReviews={reviews?.length || 0}
              />
              <Separator className="my-8" />
              <ReviewForm
                listingId={listing.id}
                existingReview={userReview}
                onSuccess={handleReviewSuccess}
              />
            </div>
          </div>

          {/* Sidebar - Booking Form */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <BookingForm listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsCard;
