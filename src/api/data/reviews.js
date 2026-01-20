import { subDays } from 'date-fns';

export const createReview = (review) => {
  const { id, userId, listingId, rating, comment, createdAt } = review;

  return {
    id,
    userId,
    listingId,
    rating,
    comment,
    createdAt: createdAt || new Date(),
    modifiedAt: new Date(),
  };
};

const today = new Date();

export const reviews = [
  createReview({
    id: 1,
    userId: 1,
    listingId: 1,
    rating: 5,
    comment:
      "Absolutely fantastic stay! The apartment was spotless, cozy, and had everything we needed. The location couldn't be better - right in the heart of London. Will definitely book again!",
    createdAt: subDays(today, 5),
  }),
  createReview({
    id: 2,
    userId: 1,
    listingId: 2,
    rating: 4,
    comment:
      'Charming studio in a great location. Perfect for exploring Paris. The only small issue was some street noise at night, but overall a wonderful experience.',
    createdAt: subDays(today, 10),
  }),
  createReview({
    id: 3,
    userId: 1,
    listingId: 3,
    rating: 5,
    comment:
      "This spacious house in London exceeded our expectations. It's beautifully decorated, well-equipped, and in a fantastic neighborhood. Highly recommend for families!",
    createdAt: subDays(today, 15),
  }),
  createReview({
    id: 4,
    userId: 1,
    listingId: 4,
    rating: 4,
    comment:
      'The stylish loft in Paris was a great base for our city adventure. Modern, clean, and with all necessary amenities. The host was very responsive and helpful.',
    createdAt: subDays(today, 20),
  }),
  createReview({
    id: 5,
    userId: 1,
    listingId: 1,
    rating: 5,
    comment:
      'We loved our stay at this modern apartment in London. The views were amazing, and the location was perfect for sightseeing. Would definitely stay here again!',
    createdAt: subDays(today, 25),
  }),
  createReview({
    id: 6,
    userId: 1,
    listingId: 2,
    rating: 4,
    comment:
      "The cozy cottage in Paris was a delightful experience. It's small but perfectly formed, with a lovely garden. Great for a romantic getaway.",
    createdAt: subDays(today, 30),
  }),
  createReview({
    id: 7,
    userId: 1,
    listingId: 1,
    rating: 5,
    comment:
      "This luxury villa in London is simply stunning. The amenities are top-notch, and the service was impeccable. It's pricey, but worth every penny for a special occasion.",
    createdAt: subDays(today, 35),
  }),
  createReview({
    id: 8,
    userId: 1,
    listingId: 1,
    rating: 4,
    comment:
      "Staying on this charming houseboat in Paris was a unique experience. It's surprisingly spacious and well-equipped. The gentle rocking took some getting used to, but overall it was fantastic.",
    createdAt: subDays(today, 40),
  }),
  createReview({
    id: 9,
    userId: 1,
    listingId: 2,
    rating: 5,
    comment:
      "The sunny apartment in London was a joy to stay in. Bright, airy, and with a lovely balcony. The host's attention to detail made us feel very welcome.",
    createdAt: subDays(today, 45),
  }),
  createReview({
    id: 10,
    userId: 1,
    listingId: 1,
    rating: 4,
    comment:
      "This cozy studio in Paris is perfect for solo travelers or couples. It's small but efficiently designed, and the location is unbeatable. Great value for money.",
    createdAt: subDays(today, 50),
  }),
  createReview({
    id: 11,
    userId: 1,
    listingId: 1,
    rating: 5,
    comment:
      "We had an amazing time at this spacious house in London. It's beautifully renovated, with a lovely garden. Perfect for our family reunion. Highly recommended!",
    createdAt: subDays(today, 55),
  }),
  createReview({
    id: 12,
    userId: 1,
    listingId: 2,
    rating: 4,
    comment:
      'The stylish loft in Paris offered a great experience. The industrial chic decor was very cool, and the location was convenient for exploring the city. Minor issue with Wi-Fi, but otherwise excellent.',
    createdAt: subDays(today, 60),
  }),
];
