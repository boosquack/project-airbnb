import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';

import { env } from '@/lib/env';

import {
  cleanUser,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  withAuth,
} from './helpers';
import { createListing, getListingById, getListings } from './listings';
import { getLocationById } from './locations';
import { getReviewsByListingId } from './reviews';
import { getUser, getUserById } from './users';

// Creates a base axios instance
const api = axios.create({
  baseURL: env.BASE_URL,
});

// Creates a mock adapter for axios
const adapter = new MockAdapter(api, { delayResponse: 1000 });

// Gets a single listing
adapter.onGet(/\/api\/listings\/\d+/).reply(
  withAuth(async (config) => {
    const id = parseInt(config.url.match(/\/api\/listings\/(\d+)/)[1]);

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
  }),
);

// Gets all listings
adapter.onGet('/api/listings').reply(
  withAuth(async (config) => {
    const { params } = config;

    // Gets all listings with optional filters
    const listings = getListings(params);

    // Maps over listings and adds location
    const domainListings = listings.map((listing) => {
      const location = getLocationById(listing.locationId);
      return { ...listing, location };
    });

    return [200, domainListings];
  }),
);

// Creates a listing
adapter.onPost('/api/listings').reply(
  withAuth(async (config) => {
    const { data } = config;

    const listing = createListing(JSON.parse(data));

    return [200, listing];
  }),
);

// Gets reviews for a listing
adapter.onGet('/api/reviews').reply(
  withAuth(async (config) => {
    const { params } = config;

    const reviews = getReviewsByListingId(params.listingId);

    return [200, reviews];
  }),
);

// Gets the current user
adapter.onGet('/api/me').reply(
  withAuth(async (config) => {
    const accessToken = config.headers.Authorization?.split(' ')[1];

    // Verifies access token and returns payload
    const accessTokenPayload = await verifyToken(accessToken, {
      returnPayload: true,
    });

    if (!accessTokenPayload) {
      return [403, { message: 'Unauthorized' }];
    }

    // Verifies refresh token and returns payload
    const refreshTokenPayload = await verifyToken(accessTokenPayload.data, {
      returnPayload: true,
    });

    if (!refreshTokenPayload) {
      return [403, { message: 'Unauthorized' }];
    }

    const user = getUserById(refreshTokenPayload.data);

    // Returns access token and user
    return [
      200,
      {
        accessToken: env.USE_AUTH ? accessToken : null,
        user: env.USE_AUTH ? cleanUser(user) : null,
      },
    ];
  }),
);

// Signs the user in
adapter.onPost('/api/signin').reply(async (config) => {
  const { data } = config;
  const user = getUser(JSON.parse(data));

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

// Refreshes the user's access token
adapter.onGet('/api/refreshToken').reply(async () => {
  // Gets refresh token from cookie
  const refreshToken = Cookies.get('refreshToken');

  // Verifies refresh token and returns payload
  const refreshTokenPayload = refreshToken
    ? await verifyToken(refreshToken, { returnPayload: true })
    : false;

  if (env.USE_AUTH && !refreshTokenPayload) {
    return [403, { message: 'Invalid refresh token' }];
  }

  // Gets user by id
  const user = getUserById(refreshTokenPayload.data);

  // Generates a new access token based on refresh token
  const accessToken = await generateAccessToken(refreshToken);

  return [200, env.USE_AUTH ? { accessToken, user: cleanUser(user) } : null];
});

// Signs the user out
adapter.onPost('/api/signout').reply(
  withAuth(() => {
    // Removes refresh token from cookies
    Cookies.remove('refreshToken');

    return [200];
  }),
);

export default api;
