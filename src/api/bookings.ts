import type { Booking } from '@/types';

import { getDatabaseTable, setDatabaseTable } from './helpers';

export const getBookingsByUserId = (userId: number): Booking[] => {
  const bookings = getDatabaseTable('bookings');
  if (!bookings) {
    return [];
  }

  return bookings.filter((booking) => booking.userId === Number(userId));
};

export const getBookingById = (id: number): Booking | null => {
  const bookings = getDatabaseTable('bookings');
  if (!bookings) {
    return null;
  }

  return bookings.find((booking) => booking.id === Number(id)) || null;
};

interface CreateBookingParams {
  userId: number;
  listingId: number;
  checkIn: Date | string;
  checkOut: Date | string;
  guests: number;
  totalPrice: number;
}

export const createBooking = (bookingData: CreateBookingParams): Booking => {
  const bookings = getDatabaseTable('bookings') || [];

  const newBooking: Booking = {
    id: bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
    userId: bookingData.userId,
    listingId: bookingData.listingId,
    checkIn: new Date(bookingData.checkIn),
    checkOut: new Date(bookingData.checkOut),
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

export const cancelBooking = (
  id: number,
  userId: number
): Booking | null => {
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

export const getBookingsByListingId = (listingId: number): Booking[] => {
  const bookings = getDatabaseTable('bookings');
  if (!bookings) {
    return [];
  }

  return bookings.filter(
    (booking) =>
      booking.listingId === Number(listingId) && booking.status !== 'cancelled'
  );
};
