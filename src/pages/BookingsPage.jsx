import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookingList } from '@/components/booking';
import { fetchBookings, cancelBooking } from '@/state/bookings/bookingsSlice';
import { fetchListings } from '@/state/listings/listingsSlice';

const BookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings, status: bookingsStatus } = useSelector((state) => state.bookings);
  const { listings, status: listingsStatus } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(fetchBookings());
    if (listingsStatus === 'idle') {
      dispatch(fetchListings());
    }
  }, [dispatch, listingsStatus]);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(bookingId));
    }
  };

  const isLoading = bookingsStatus === 'loading' || listingsStatus === 'loading';

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <BookingList
        bookings={bookings}
        listings={listings}
        isLoading={isLoading}
        onCancel={handleCancelBooking}
      />
    </div>
  );
};

export default BookingsPage;
