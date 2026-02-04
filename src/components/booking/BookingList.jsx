import { Spinner } from '@/components/ui';

import { BookingCard } from './BookingCard';

const BookingList = ({ bookings, listings, isLoading, onCancel }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const getListingForBooking = (listingId) => {
    return listings?.find((l) => l.id === listingId);
  };

  const sortedBookings = [...(bookings || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (!sortedBookings || sortedBookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No bookings yet.</p>
        <p className="text-muted-foreground text-sm mt-2">
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
