import { MapPin, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import type { ListingWithLocation } from '@/types';

interface ListingCardProps {
  listing: ListingWithLocation;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Link to={`/listings/${listing.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <ListingCardImages listing={listing} />
          <ListingFavoriteButton
            listing={listing}
            className="absolute right-3 top-3 z-10"
          />
          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1.5">
            <Star className="w-4 h-4 fill-star text-star" />
            <span className="text-sm font-medium">{listing.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
              {listing.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{listing.location.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{listing.maxGuests} guests</span>
            </div>
            <div className="text-right">
              <span className="font-semibold text-lg">${listing.price}</span>
              <span className="text-sm text-muted-foreground"> / night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
