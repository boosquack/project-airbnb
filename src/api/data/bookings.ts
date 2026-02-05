import { addDays, subDays } from 'date-fns';

import type { Booking, BookingStatus } from '@/types';

interface BookingInput {
  id: number;
  userId: number;
  listingId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status?: BookingStatus;
  createdAt?: Date;
}

export const createBooking = (booking: BookingInput): Booking => {
  const {
    id,
    userId,
    listingId,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    status = 'confirmed',
    createdAt,
  } = booking;

  return {
    id,
    userId,
    listingId,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    status,
    createdAt: createdAt || new Date(),
    modifiedAt: new Date(),
  };
};

const today = new Date();

export const bookings: Booking[] = [
  createBooking({
    id: 1,
    userId: 1,
    listingId: 1,
    checkIn: subDays(today, 30),
    checkOut: subDays(today, 25),
    guests: 2,
    totalPrice: 500,
    status: 'completed',
    createdAt: subDays(today, 35),
  }),
  createBooking({
    id: 2,
    userId: 1,
    listingId: 2,
    checkIn: subDays(today, 15),
    checkOut: subDays(today, 10),
    guests: 2,
    totalPrice: 600,
    status: 'completed',
    createdAt: subDays(today, 20),
  }),
  createBooking({
    id: 3,
    userId: 1,
    listingId: 3,
    checkIn: addDays(today, 5),
    checkOut: addDays(today, 10),
    guests: 4,
    totalPrice: 750,
    status: 'confirmed',
    createdAt: subDays(today, 3),
  }),
  createBooking({
    id: 4,
    userId: 1,
    listingId: 5,
    checkIn: subDays(today, 60),
    checkOut: subDays(today, 55),
    guests: 3,
    totalPrice: 450,
    status: 'cancelled',
    createdAt: subDays(today, 65),
  }),
];
