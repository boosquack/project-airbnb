import { getDatabaseTable } from './helpers';

export const getLocationById = (id) => {
  const locations = getDatabaseTable('locations');
  if (!locations) {
    console.log('No locations table found');
    return;
  }

  return locations.find((location) => location.id === id);
};
