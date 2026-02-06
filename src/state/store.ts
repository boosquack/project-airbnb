import { configureStore } from '@reduxjs/toolkit';

import bookingsReducer from './bookings/bookingsSlice';
import listingsReducer from './listings/listingsSlice';
import reviewsReducer from './reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    listings: listingsReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
