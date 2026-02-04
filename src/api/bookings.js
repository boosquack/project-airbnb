import { getDatabaseTable, setDatabaseTable } from './helpers';

export const getBookingsByUserId = (userId) => {
  const bookings = getDatabaseTable('bookings');
  if (!bookings) {
    return [];
  }

  return bookings.filter((booking) => booking.userId === Number(userId));
};

export const getBookingById = (id) => {
  const bookings = getDatabaseTable('bookings');
  if (!bookings) {
    return null;
  }

  return bookings.find((booking) => booking.id === Number(id));
};

export const createBooking = (bookingData) => {
  const bookings = getDatabaseTable('bookings') || [];

  const newBooking = {
    id: bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
    userId: bookingData.userId,
    listingId: bookingData.listingId,
    checkIn: bookingData.checkIn,
    checkOut: bookingData.checkOut,
    guests: bookingData.guests,
    totalPrice: bookingData.totalPrice,
    status: 'confirmed',
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  bookings.push(newBooking);
  setDatabaseTable('bookings', bookings);

  return newBooking;
};

export const cancelBooking = (id, userId) => {
  const bookings = getDatabaseTable('bookings');
  if (!bookings) {
    return null;
  }

  const bookingIndex = bookings.findIndex(
    (booking) => booking.id === Number(id) && booking.userId === Number(userId)
  );

  if (bookingIndex === -1) {
    return null;
  }

  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    status: 'cancelled',
    modifiedAt: new Date(),
  };

  setDatabaseTable('bookings', bookings);

  return bookings[bookingIndex];
};

export const getBookingsByListingId = (listingId) => {
  const bookings = getDatabaseTable('bookings');
  if (!bookings) {
    return [];
  }

  return bookings.filter(
    (booking) =>
      booking.listingId === Number(listingId) && booking.status !== 'cancelled'
  );
};
