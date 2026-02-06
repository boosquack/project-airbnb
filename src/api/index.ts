import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';

import { env } from '@/lib/env';

import {
  cleanUser,
  generateAccessToken,
  generateRefreshToken,
  getUserIdFromToken,
  verifyToken,
  withAuth,
} from './helpers';
import {
  cancelBooking,
  createBooking,
  getBookingsByUserId,
} from './bookings';
import {
  createListing,
  getFeaturedListings,
  getListingById,
  getListings,
  getPublicListings,
} from './listings';
import { getLocationById } from './locations';
import {
  createReview,
  deleteReview,
  getReviewsByListingId,
  updateReview,
} from './reviews';
import { createUser, getUser, getUserByEmail, getUserById } from './users';

// Creates a base axios instance
const api = axios.create({
  baseURL: env.BASE_URL,
});

// Creates a mock adapter for axios
const adapter = new MockAdapter(api, { delayResponse: 1000 });

// Gets a single listing (public - no auth required)
adapter.onGet(/\/api\/listings\/\d+/).reply(async (config) => {
  const match = config.url?.match(/\/api\/listings\/(\d+)/);
  if (!match) return [400, { message: 'Invalid request' }];
  const id = parseInt(match[1]);

  // Gets listing by id
  const listing = getListingById(id);
  if (!listing) {
    return [404, { message: 'Listing not found' }];
  }

  const location = getLocationById(listing.locationId);
  if (!location) {
    return [404, { message: 'Location not found' }];
  }

  return [200, { ...listing, location }];
});

// Gets all listings (public - no auth required)
adapter.onGet('/api/listings').reply(async (config) => {
  const { params } = config;

  // Gets all listings with optional filters
  const listings = getListings(params);

  // Maps over listings and adds location
  const domainListings = listings.map((listing) => {
    const location = getLocationById(listing.locationId);
    return { ...listing, location };
  });

  return [200, domainListings];
});

// Creates a listing
adapter.onPost('/api/listings').reply(
  withAuth(async (config) => {
    const { data } = config;

    const listing = createListing(JSON.parse(data as string));

    return [200, listing];
  })
);

// Gets reviews for a listing (public - no auth required)
adapter.onGet('/api/reviews').reply(async (config) => {
  const { params } = config;

  const reviews = getReviewsByListingId(params?.listingId);

  return [200, reviews];
});

// Creates a review
adapter.onPost('/api/reviews').reply(
  withAuth(async (config) => {
    const accessToken = config.headers?.Authorization?.toString().split(' ')[1];
    if (!accessToken) return [403, { message: 'Unauthorized' }];

    const userId = await getUserIdFromToken(accessToken);

    if (!userId) {
      return [403, { message: 'Unauthorized' }];
    }

    const { listingId, rating, comment } = JSON.parse(config.data as string);

    const review = createReview({
      userId,
      listingId,
      rating,
      comment,
    });

    return [201, review];
  })
);

// Updates a review
adapter.onPut(/\/api\/reviews\/\d+/).reply(
  withAuth(async (config) => {
    const accessToken = config.headers?.Authorization?.toString().split(' ')[1];
    if (!accessToken) return [403, { message: 'Unauthorized' }];

    const userId = await getUserIdFromToken(accessToken);

    if (!userId) {
      return [403, { message: 'Unauthorized' }];
    }

    const match = config.url?.match(/\/api\/reviews\/(\d+)/);
    if (!match) return [400, { message: 'Invalid request' }];
    const id = parseInt(match[1]);
    const { rating, comment } = JSON.parse(config.data as string);

    const review = updateReview(id, userId, { rating, comment });

    if (!review) {
      return [404, { message: 'Review not found or unauthorized' }];
    }

    return [200, review];
  })
);

// Deletes a review
adapter.onDelete(/\/api\/reviews\/\d+/).reply(
  withAuth(async (config) => {
    const accessToken = config.headers?.Authorization?.toString().split(' ')[1];
    if (!accessToken) return [403, { message: 'Unauthorized' }];

    const userId = await getUserIdFromToken(accessToken);

    if (!userId) {
      return [403, { message: 'Unauthorized' }];
    }

    const match = config.url?.match(/\/api\/reviews\/(\d+)/);
    if (!match) return [400, { message: 'Invalid request' }];
    const id = parseInt(match[1]);

    const deleted = deleteReview(id, userId);

    if (!deleted) {
      return [404, { message: 'Review not found or unauthorized' }];
    }

    return [200, { message: 'Review deleted' }];
  })
);

// Gets user's bookings
adapter.onGet('/api/bookings').reply(
  withAuth(async (config) => {
    const accessToken = config.headers?.Authorization?.toString().split(' ')[1];
    if (!accessToken) return [403, { message: 'Unauthorized' }];

    const userId = await getUserIdFromToken(accessToken);

    if (!userId) {
      return [403, { message: 'Unauthorized' }];
    }

    const bookings = getBookingsByUserId(userId);

    return [200, bookings];
  })
);

// Creates a booking
adapter.onPost('/api/bookings').reply(
  withAuth(async (config) => {
    const accessToken = config.headers?.Authorization?.toString().split(' ')[1];
    if (!accessToken) return [403, { message: 'Unauthorized' }];

    const userId = await getUserIdFromToken(accessToken);

    if (!userId) {
      return [403, { message: 'Unauthorized' }];
    }

    const { listingId, checkIn, checkOut, guests, totalPrice } = JSON.parse(
      config.data as string
    );

    const booking = createBooking({
      userId,
      listingId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    return [201, booking];
  })
);

// Cancels a booking
adapter.onDelete(/\/api\/bookings\/\d+/).reply(
  withAuth(async (config) => {
    const accessToken = config.headers?.Authorization?.toString().split(' ')[1];
    if (!accessToken) return [403, { message: 'Unauthorized' }];

    const userId = await getUserIdFromToken(accessToken);

    if (!userId) {
      return [403, { message: 'Unauthorized' }];
    }

    const match = config.url?.match(/\/api\/bookings\/(\d+)/);
    if (!match) return [400, { message: 'Invalid request' }];
    const id = parseInt(match[1]);

    const booking = cancelBooking(id, userId);

    if (!booking) {
      return [404, { message: 'Booking not found or unauthorized' }];
    }

    return [200, booking];
  })
);

// Gets featured listings (public, no auth required)
adapter.onGet('/api/listings/featured').reply(async () => {
  const listings = getFeaturedListings(6);

  const domainListings = listings.map((listing) => {
    const location = getLocationById(listing.locationId);
    return { ...listing, location };
  });

  return [200, domainListings];
});

// Gets public listings (no auth required)
adapter.onGet('/api/listings/public').reply(async (config) => {
  const { params } = config;

  const listings = getPublicListings(params);

  const domainListings = listings.map((listing) => {
    const location = getLocationById(listing.locationId);
    return { ...listing, location };
  });

  return [200, domainListings];
});

// Gets the current user
adapter.onGet('/api/me').reply(
  withAuth(async (config) => {
    const accessToken = config.headers?.Authorization?.toString().split(' ')[1];
    if (!accessToken) return [403, { message: 'Unauthorized' }];

    // Verifies access token and returns payload
    const accessTokenPayload = await verifyToken(accessToken, {
      returnPayload: true,
    });

    if (!accessTokenPayload || typeof accessTokenPayload === 'boolean') {
      return [403, { message: 'Unauthorized' }];
    }

    // Verifies refresh token and returns payload
    const refreshTokenPayload = await verifyToken(
      accessTokenPayload.data as string,
      {
        returnPayload: true,
      }
    );

    if (!refreshTokenPayload || typeof refreshTokenPayload === 'boolean') {
      return [403, { message: 'Unauthorized' }];
    }

    const user = getUserById(refreshTokenPayload.data as number);
    if (!user) {
      return [403, { message: 'Unauthorized' }];
    }

    // Returns access token and user
    return [
      200,
      {
        accessToken: env.USE_AUTH ? accessToken : null,
        user: env.USE_AUTH ? cleanUser(user) : null,
      },
    ];
  })
);

// Signs the user in
adapter.onPost('/api/signin').reply(async (config) => {
  const { data } = config;
  const user = getUser(JSON.parse(data as string));

  if (user) {
    // Creates a refresh token based on the user's id
    const refreshToken = await generateRefreshToken(user.id);

    // Since there is no backend, token is stored in a normal cookie
    // Otherwise it would be stored in a secure HTTP-only cookie for security
    Cookies.set('refreshToken', refreshToken);

    // Creates an access token based on the refresh token
    const accessToken = await generateAccessToken(refreshToken);

    // Returns access token and user
    return [
      200,
      {
        accessToken: env.USE_AUTH ? accessToken : null,
        user: env.USE_AUTH ? cleanUser(user) : null,
      },
    ];
  } else {
    return [401, { message: 'Invalid credentials' }];
  }
});

// Signs up a new user
adapter.onPost('/api/signup').reply(async (config) => {
  const { data } = config;
  const { firstName, lastName, email, password } = JSON.parse(data as string);

  // Check if user already exists
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return [400, { message: 'An account with this email already exists' }];
  }

  // Create new user
  const user = createUser({ firstName, lastName, email, password });

  // Creates a refresh token based on the user's id
  const refreshToken = await generateRefreshToken(user.id);

  // Store refresh token in cookie
  Cookies.set('refreshToken', refreshToken);

  // Creates an access token based on the refresh token
  const accessToken = await generateAccessToken(refreshToken);

  // Returns access token and user
  return [
    200,
    {
      accessToken: env.USE_AUTH ? accessToken : null,
      user: env.USE_AUTH ? cleanUser(user) : null,
    },
  ];
});

// Refreshes the user's access token
adapter.onGet('/api/refreshToken').reply(async () => {
  // Gets refresh token from cookie
  const refreshToken = Cookies.get('refreshToken');

  // Verifies refresh token and returns payload
  const refreshTokenPayload = refreshToken
    ? await verifyToken(refreshToken, { returnPayload: true })
    : false;

  if (
    env.USE_AUTH &&
    (!refreshTokenPayload || typeof refreshTokenPayload === 'boolean')
  ) {
    return [403, { message: 'Invalid refresh token' }];
  }

  if (typeof refreshTokenPayload === 'boolean') {
    return [403, { message: 'Invalid refresh token' }];
  }

  // Gets user by id
  const user = getUserById(refreshTokenPayload.data as number);
  if (!user) {
    return [403, { message: 'Invalid refresh token' }];
  }

  // Generates a new access token based on refresh token
  const accessToken = await generateAccessToken(refreshToken!);

  return [200, env.USE_AUTH ? { accessToken, user: cleanUser(user) } : null];
});

// Signs the user out
adapter.onPost('/api/signout').reply(
  withAuth(async () => {
    // Removes refresh token from cookies
    Cookies.remove('refreshToken');

    return [200];
  })
);

export default api;
