import type { Listing, ListingFilters } from '@/types';

import { isListingAvailable } from './data/listings';
import { getDatabaseTable, setDatabaseTable } from './helpers';

// Gets listing by id
export const getListingById = (id: number): Listing | undefined => {
  const listings = getDatabaseTable('listings');
  if (!listings) {
    console.log('No listings table found');
    return;
  }

  return listings.find((listing) => listing.id === id);
};

// Gets listings using optional date range and search parameters
export const getListings = (params: ListingFilters = {}): Listing[] => {
  const { dates, guests, search } = params;

  // Gets the listings table
  const listings = getDatabaseTable('listings');
  if (!listings) {
    console.log('No listings table found');
    return [];
  }

  // Sets a new variable for the filtered listings
  let filteredListings = listings;

  // Handles date range
  if (dates) {
    filteredListings = filteredListings.filter((listing) =>
      isListingAvailable(listing, dates)
    );
  }

  // Handles guests
  if (guests) {
    filteredListings = filteredListings.filter(
      (listing) => guests <= listing.maxGuests
    );
  }

  // Handles search
  if (search) {
    filteredListings = filteredListings.filter((listing) =>
      listing.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filteredListings;
};

// Creates a listing
export const createListing = (
  data: Partial<Listing>
): Listing | undefined => {
  const listings = getDatabaseTable('listings');
  if (!listings) {
    console.log('No listings table found');
    return;
  }

  const newListing: Listing = {
    ...data,
    createdAt: new Date(),
    modifiedAt: new Date(),
    userId: 1,
    id: listings.length + 1,
  } as Listing;

  listings.push(newListing);

  setDatabaseTable('listings', listings);

  return newListing;
};

// Gets featured/top-rated listings (public, no auth)
export const getFeaturedListings = (limit: number = 6): Listing[] => {
  const listings = getDatabaseTable('listings');
  if (!listings) {
    return [];
  }

  // Sort by rating and return top listings
  return [...listings].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

interface PublicListingsParams {
  search?: string;
  limit?: number;
}

// Gets public listings with search (no auth required)
export const getPublicListings = (
  params: PublicListingsParams = {}
): Listing[] => {
  const { search, limit = 12 } = params;

  const listings = getDatabaseTable('listings');
  if (!listings) {
    return [];
  }

  let filteredListings = listings;

  if (search) {
    filteredListings = filteredListings.filter((listing) =>
      listing.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filteredListings.slice(0, limit);
};
