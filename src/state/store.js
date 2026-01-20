import { configureStore } from '@reduxjs/toolkit';

import listingsReducer from './listings/listingsSlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
});
