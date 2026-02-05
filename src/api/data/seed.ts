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

// Add all data to localstorage to simulate database
export const seedLocalDatabase = (): void => {
  const database = getItem<Database>(env.DB_KEY);

  // If a database already exists, do nothing
  if (database) {
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
};
