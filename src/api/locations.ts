import type { Location } from '@/types';

import { getDatabaseTable } from './helpers';

export const getLocationById = (id: number): Location | undefined => {
  const locations = getDatabaseTable('locations');
  if (!locations) {
    console.log('No locations table found');
    return;
  }

  return locations.find((location) => location.id === id);
};
