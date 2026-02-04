import { format } from 'date-fns';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button, Card, CardContent, CardFooter } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const statusStyles = {
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const BookingCard = ({ booking, listing, onCancel }) => {
  const checkIn = booking?.checkIn ? new Date(booking.checkIn) : null;
  const checkOut = booking?.checkOut ? new Date(booking.checkOut) : null;

  const canCancel = booking?.status === 'confirmed';

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {listing?.images?.[0] && (
          <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
            <img
              src={`/images/${listing.images[0]}`}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <Link
                to={`/listings/${listing?.id}`}
                className="text-lg font-semibold hover:underline"
              >
                {listing?.name || 'Unknown Listing'}
              </Link>
              <span
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full capitalize',
                  statusStyles[booking?.status] || statusStyles.confirmed
                )}
              >
                {booking?.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {checkIn ? format(checkIn, 'MMM d') : '-'} -{' '}
                  {checkOut ? format(checkOut, 'MMM d, yyyy') : '-'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {booking?.guests} guest{booking?.guests !== 1 ? 's' : ''}
                </span>
              </div>
              {listing?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location.name}</span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <span className="font-semibold">${booking?.totalPrice}</span>
            {canCancel && onCancel && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(booking.id)}
              >
                Cancel Booking
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export { BookingCard };
