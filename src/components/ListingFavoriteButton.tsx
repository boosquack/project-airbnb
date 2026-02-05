import { Heart } from 'lucide-react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { ListingWithLocation } from '@/types';
import type { RootState } from '@/state/store';
import {
  addFavoriteListing,
  removeFavoriteListing,
} from '@/state/listings/listingsSlice';

interface ListingFavoriteButtonProps {
  className?: string;
  listing: ListingWithLocation;
}

const ListingFavoriteButton = ({
  className,
  listing,
}: ListingFavoriteButtonProps) => {
  const favoriteListingIds = useSelector(
    (state: RootState) => state.listings.favoriteListingIds
  );
  const dispatch = useDispatch();

  const isFavorite = useMemo(
    () => favoriteListingIds.includes(listing.id),
    [listing, favoriteListingIds]
  );

  return (
    <Button
      className={className}
      variant="outline"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
          dispatch(removeFavoriteListing(listing.id));
        } else {
          dispatch(addFavoriteListing(listing.id));
        }
      }}
    >
      <Heart
        className={cn('h-4 w-4', { 'fill-primary text-primary': isFavorite })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;
