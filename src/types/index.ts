// Core entity types

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  initials: string;
  avatarUrl: string | null;
  bio: string | null;
  password?: string;
  createdAt: Date;
  modifiedAt: Date;
}

export type CleanUser = Omit<User, 'password'>;

export interface Location {
  id: number;
  name: string;
  country: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface Listing {
  id: number;
  name: string;
  description: string;
  locationId: number;
  images: string[];
  availability: DateRange;
  maxGuests: number;
  price: number;
  rating: number;
  guestFavorite?: boolean;
  userId: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ListingWithLocation extends Listing {
  location: Location;
}

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: number;
  userId: number;
  listingId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  modifiedAt: Date;
}

export interface BookingWithListing extends Booking {
  listing?: ListingWithLocation;
}

export interface Review {
  id: number;
  userId: number;
  listingId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ReviewWithUser extends Review {
  user?: CleanUser;
}

// Filter types

export interface ListingFilters {
  dates?: DateRange | null;
  guests?: number;
  search?: string;
}

// Create/Update input types

export interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateListingInput {
  name: string;
  description: string;
  locationId: number;
  images: string[];
  availability: DateRange;
  maxGuests: number;
  price: number;
  rating: number;
  guestFavorite?: boolean;
  userId: number;
}

export interface CreateBookingInput {
  listingId: number;
  checkIn: Date | string;
  checkOut: Date | string;
  guests: number;
  totalPrice: number;
}

export interface CreateReviewInput {
  listingId: number;
  rating: number;
  comment: string;
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}
