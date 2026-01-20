import { getDatabaseTable } from './helpers';

export const getReviewsByListingId = (listingId) => {
  const reviews = getDatabaseTable('reviews');
  if (!reviews) {
    console.log('No reviews table found');
    return [];
  }

  return reviews.filter((review) => review.listingId === Number(listingId));
};
