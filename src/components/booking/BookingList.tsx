import { Spinner } from '@/components/ui';
import type { Booking, ListingWithLocation } from '@/types';

import { BookingCard } from './BookingCard';

interface BookingListProps {
  bookings: Booking[];
  listings?: ListingWithLocation[];
  isLoading: boolean;
  onCancel?: (id: number) => void;
}

const BookingList = ({
  bookings,
  listings,
  isLoading,
  onCancel,
}: BookingListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const getListingForBooking = (listingId: number) => {
    return listings?.find((l) => l.id === listingId);
  };

  const sortedBookings = [...(bookings || [])].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!sortedBookings || sortedBookings.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No bookings yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Start exploring listings to make your first reservation!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sortedBookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          listing={getListingForBooking(booking.listingId)}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};

export { BookingList };
