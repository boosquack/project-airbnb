import { format } from 'date-fns';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button, Card, CardContent, CardFooter, CardHeader } from '@/components/ui';

const BookingConfirmation = ({ booking, listing }) => {
  const checkIn = booking?.checkIn ? new Date(booking.checkIn) : null;
  const checkOut = booking?.checkOut ? new Date(booking.checkOut) : null;

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader className="pb-2">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Your reservation has been successfully made.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="bg-muted rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-3">{listing?.name || 'Listing'}</h3>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in</span>
              <span>{checkIn ? format(checkIn, 'EEE, MMM d, yyyy') : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-out</span>
              <span>{checkOut ? format(checkOut, 'EEE, MMM d, yyyy') : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guests</span>
              <span>{booking?.guests || 0}</span>
            </div>
            <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
              <span>Total</span>
              <span>${booking?.totalPrice || 0}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button asChild className="w-full">
          <Link to="/bookings">View My Bookings</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to="/listings">Browse More Listings</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { BookingConfirmation };
