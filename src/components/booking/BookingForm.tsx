import { differenceInDays } from 'date-fns';
import { useState, useEffect, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  DateRangePicker,
  Separator,
  Stepper,
} from '@/components/ui';
import type { ListingWithLocation } from '@/types';
import type { AppDispatch, RootState } from '@/state/store';
import {
  createBooking,
  resetCreateStatus,
} from '@/state/bookings/bookingsSlice';

interface BookingFormProps {
  listing: ListingWithLocation;
  onSuccess?: () => void;
}

const BookingForm = ({ listing, onSuccess }: BookingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { createStatus } = useSelector((state: RootState) => state.bookings);

  const [dates, setDates] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');

  const isSubmitting = createStatus === 'loading';

  const { nights, totalPrice, serviceFee, cleaningFee } = useMemo(() => {
    if (!dates?.from || !dates?.to) {
      return { nights: 0, totalPrice: 0, serviceFee: 0, cleaningFee: 0 };
    }

    const nightCount = differenceInDays(dates.to, dates.from);
    const basePrice = listing.price * nightCount;
    const service = Math.round(basePrice * 0.12);
    const cleaning = 50;
    const total = basePrice + service + cleaning;

    return {
      nights: nightCount,
      totalPrice: total,
      serviceFee: service,
      cleaningFee: cleaning,
    };
  }, [dates, listing.price]);

  useEffect(() => {
    if (createStatus === 'succeeded') {
      dispatch(resetCreateStatus());
      onSuccess?.();
      navigate('/bookings');
    }
  }, [createStatus, dispatch, navigate, onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!dates?.from || !dates?.to) {
      setError('Please select check-in and check-out dates');
      return;
    }

    if (guests < 1) {
      setError('Please select at least 1 guest');
      return;
    }

    if (guests > listing.maxGuests) {
      setError(`Maximum ${listing.maxGuests} guests allowed`);
      return;
    }

    dispatch(
      createBooking({
        listingId: listing.id,
        checkIn: dates.from.toISOString(),
        checkOut: dates.to.toISOString(),
        guests,
        totalPrice,
      })
    );
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">${listing.price}</span>
          <span className="text-muted-foreground">/ night</span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Dates</label>
            <DateRangePicker
              value={dates}
              onChange={setDates}
              placeholder="Select dates"
              minDate={
                listing.availability?.from
                  ? new Date(listing.availability.from)
                  : new Date()
              }
              maxDate={
                listing.availability?.to
                  ? new Date(listing.availability.to)
                  : undefined
              }
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Guests</label>
            <Stepper
              value={guests}
              onChange={(val) =>
                setGuests(Math.max(1, Math.min(val, listing.maxGuests)))
              }
              label="Guest"
            />
            <span className="text-xs text-muted-foreground">
              Max {listing.maxGuests} guests
            </span>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={isSubmitting || nights === 0}
            className="w-full"
          >
            {isSubmitting ? 'Booking...' : 'Reserve'}
          </Button>
        </form>
      </CardContent>

      {nights > 0 && (
        <CardFooter className="flex flex-col gap-3 pt-0">
          <Separator />
          <div className="flex w-full flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                ${listing.price} x {nights} night{nights > 1 ? 's' : ''}
              </span>
              <span>${listing.price * nights}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export { BookingForm };
