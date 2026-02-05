import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ListingList from '@/components/ListingList';
import type { RootState } from '@/state/store';

const ListingFavoritesPage = () => {
  const { listings, favoriteListingIds } = useSelector(
    (state: RootState) => state.listings,
  );

  const favoriteListings = useMemo(
    () => listings.filter((listing) => favoriteListingIds.includes(listing.id)),
    [listings, favoriteListingIds],
  );

  return (
    <div className='container py-4'>
      <ListingList listings={favoriteListings} />
    </div>
  );
};

export default ListingFavoritesPage;
