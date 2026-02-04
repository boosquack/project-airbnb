import { DollarSign, Pin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { StarRatingDisplay } from '@/components/reviews';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listings/${listing.id}`}>
      <Card className='w-[320px]'>
        <div className='relative'>
          <ListingCardImages listing={listing} />
          <ListingFavoriteButton
            listing={listing}
            className='absolute right-4 top-4'
          />
        </div>
        <CardContent className='flex flex-col gap-2 p-4'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-xl font-semibold'>{listing.name}</h2>
            <StarRatingDisplay rating={listing.rating} size="sm" />
          </div>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
