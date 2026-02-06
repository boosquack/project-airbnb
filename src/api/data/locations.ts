import type { Location } from '@/types';

interface LocationInput {
  id: number;
  name: string;
  country: string;
}

export const createLocation = (location: LocationInput): Location => {
  const { id, name, country } = location;

  return {
    id,
    country,
    name,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
};

export const locations: Location[] = [
  createLocation({
    id: 1,
    name: 'London',
    country: 'United Kingdom',
  }),
  createLocation({
    id: 2,
    name: 'Paris',
    country: 'France',
  }),
];
