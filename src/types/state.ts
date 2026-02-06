import type { Booking, ListingWithLocation, Review } from './index';

// Status types for async operations

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// Listings slice state

export interface ListingsState {
  listings: ListingWithLocation[];
  error: string | null;
  favoriteListingIds: number[];
  status: AsyncStatus;
}

// Bookings slice state

export interface BookingsState {
  bookings: Booking[];
  error: string | null;
  status: AsyncStatus;
}

// Reviews slice state

export interface ReviewsState {
  reviews: Review[];
  error: string | null;
  status: AsyncStatus;
}

// Root state

export interface RootState {
  listings: ListingsState;
  bookings: BookingsState;
  reviews: ReviewsState;
}
