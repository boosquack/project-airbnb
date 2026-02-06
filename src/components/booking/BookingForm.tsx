import { differenceInDays } from 'date-fns';
import { Calendar, Lock, Users } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
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
  const location = useLocation();
  const { token } = useAuth();
  const { createStatus } = useSelector((state: RootState) => state.bookings);

  const [dates, setDates] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');

  const isSubmitting = createStatus === 'loading';
  const isAuthenticated = !!token;

  const { nights, totalPrice, serviceFee, cleaningFee, basePrice } = useMemo(() => {
    if (!dates?.from || !dates?.to) {
      return { nights: 0, totalPrice: 0, serviceFee: 0, cleaningFee: 0, basePrice: 0 };
    }

    const nightCount = differenceInDays(dates.to, dates.from);
    const base = listing.price * nightCount;
    const service = Math.round(base * 0.12);
    const cleaning = 50;
    const total = base + service + cleaning;

    return {
      nights: nightCount,
      totalPrice: total,
      serviceFee: service,
      cleaningFee: cleaning,
      basePrice: base,
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
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-display font-semibold">${listing.price}</span>
          <span className="text-muted-foreground">/ night</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Dates
            </label>
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
            <label className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Guests
            </label>
            <Stepper
              value={guests}
              onChange={(val) =>
                setGuests(Math.max(1, Math.min(val, listing.maxGuests)))
              }
              label="Guest"
            />
            <span className="text-xs text-muted-foreground">
              Maximum {listing.maxGuests} guests
            </span>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {isAuthenticated ? (
            <Button
              type="submit"
              disabled={isSubmitting || nights === 0}
              size="lg"
              className="w-full rounded-full"
            >
              {isSubmitting ? 'Booking...' : 'Reserve'}
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <span>Sign in to book this property</span>
              </div>
              <Button asChild size="lg" className="w-full rounded-full">
                <Link to={`/signin?redirect=${encodeURIComponent(location.pathname)}`}>
                  Sign in to Book
                </Link>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link to={`/signup?redirect=${encodeURIComponent(location.pathname)}`} className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          )}
        </form>
      </CardContent>

      {nights > 0 && (
        <CardFooter className="flex flex-col gap-3 pt-0">
          <Separator />
          <div className="flex w-full flex-col gap-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                ${listing.price} x {nights} night{nights > 1 ? 's' : ''}
              </span>
              <span>${basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between font-semibold text-base">
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
