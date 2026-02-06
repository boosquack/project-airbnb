import type { Review, UpdateReviewInput } from '@/types';

import { getDatabaseTable, setDatabaseTable } from './helpers';

export const getReviewsByListingId = (listingId: number): Review[] => {
  const reviews = getDatabaseTable('reviews');
  if (!reviews) {
    console.log('No reviews table found');
    return [];
  }

  return reviews.filter((review) => review.listingId === Number(listingId));
};

export const getReviewById = (id: number): Review | null => {
  const reviews = getDatabaseTable('reviews');
  if (!reviews) {
    return null;
  }

  return reviews.find((review) => review.id === Number(id)) || null;
};

interface CreateReviewParams {
  userId: number;
  listingId: number;
  rating: number;
  comment: string;
}

export const createReview = (reviewData: CreateReviewParams): Review => {
  const reviews = getDatabaseTable('reviews') || [];

  const newReview: Review = {
    id: reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1,
    userId: reviewData.userId,
    listingId: reviewData.listingId,
    rating: reviewData.rating,
    comment: reviewData.comment,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  reviews.push(newReview);
  setDatabaseTable('reviews', reviews);

  return newReview;
};

export const updateReview = (
  id: number,
  userId: number,
  reviewData: UpdateReviewInput
): Review | null => {
  const reviews = getDatabaseTable('reviews');
  if (!reviews) {
    return null;
  }

  const reviewIndex = reviews.findIndex(
    (review) => review.id === Number(id) && review.userId === Number(userId)
  );

  if (reviewIndex === -1) {
    return null;
  }

  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    rating: reviewData.rating ?? reviews[reviewIndex].rating,
    comment: reviewData.comment ?? reviews[reviewIndex].comment,
    modifiedAt: new Date(),
  };

  setDatabaseTable('reviews', reviews);

  return reviews[reviewIndex];
};

export const deleteReview = (id: number, userId: number): boolean => {
  const reviews = getDatabaseTable('reviews');
  if (!reviews) {
    return false;
  }

  const reviewIndex = reviews.findIndex(
    (review) => review.id === Number(id) && review.userId === Number(userId)
  );

  if (reviewIndex === -1) {
    return false;
  }

  reviews.splice(reviewIndex, 1);
  setDatabaseTable('reviews', reviews);

  return true;
};

export const getUserReviewForListing = (
  userId: number,
  listingId: number
): Review | null => {
  const reviews = getDatabaseTable('reviews');
  if (!reviews) {
    return null;
  }

  return (
    reviews.find(
      (review) =>
        review.userId === Number(userId) &&
        review.listingId === Number(listingId)
    ) || null
  );
};
