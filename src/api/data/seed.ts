import { env } from '@/lib/env';
import { getItem, setItem } from '@/lib/utils/localStorage';

import type { Booking, Listing, Location, Review, User } from '@/types';

import { bookings } from './bookings';
import { listings } from './listings';
import { locations } from './locations';
import { reviews } from './reviews';
import { users } from './users';

export interface Database {
  bookings: Booking[];
  listings: Listing[];
  locations: Location[];
  users: User[];
  reviews: Review[];
}

// Increment this version whenever seed data changes to force a re-seed
const DB_VERSION = 2;
const DB_VERSION_KEY = `${env.DB_KEY}-version`;

// Add all data to localstorage to simulate database
export const seedLocalDatabase = (): void => {
  const database = getItem<Database>(env.DB_KEY);
  const storedVersion = getItem<number>(DB_VERSION_KEY);

  // If a database already exists and the version matches, do nothing
  if (database && storedVersion === DB_VERSION) {
    return;
  }

  // Creates the initial database with all data
  const initialDatabase: Database = {
    bookings,
    listings,
    locations,
    users,
    reviews,
  };

  setItem(env.DB_KEY, initialDatabase);
  setItem(DB_VERSION_KEY, DB_VERSION);
};
