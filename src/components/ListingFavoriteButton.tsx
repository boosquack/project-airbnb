import { Heart } from 'lucide-react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
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
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const favoriteListingIds = useSelector(
    (state: RootState) => state.listings.favoriteListingIds
  );
  const dispatch = useDispatch();

  const isAuthenticated = !!token;

  const isFavorite = useMemo(
    () => favoriteListingIds.includes(listing.id),
    [listing, favoriteListingIds]
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate(`/signin?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    if (isFavorite) {
      dispatch(removeFavoriteListing(listing.id));
    } else {
      dispatch(addFavoriteListing(listing.id));
    }
  };

  return (
    <Button
      className={cn(
        'rounded-full w-10 h-10 p-0 bg-background/80 backdrop-blur-sm hover:bg-background border-0 shadow-sm',
        className
      )}
      variant="outline"
      onClick={handleClick}
    >
      <Heart
        className={cn('h-5 w-5 transition-colors', {
          'fill-primary text-primary': isFavorite && isAuthenticated,
          'text-foreground hover:text-primary': !isFavorite || !isAuthenticated,
        })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;
