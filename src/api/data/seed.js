import { env } from '@/lib/env';
import { getItem, setItem } from '@/lib/utils/localStorage';

import { listings } from './listings';
import { locations } from './locations';
import { reviews } from './reviews';
import { users } from './users';

// Add all data to localstorage to simulate database
export const seedLocalDatabase = () => {
  const database = getItem(env.DB_KEY);

  // If a database already exists, do nothing
  if (database) {
    return;
  }

  // Creates the initial database with all data
  const initialDatabase = {
    listings,
    locations,
    users,
    reviews,
  };

  setItem(env.DB_KEY, initialDatabase);
};
