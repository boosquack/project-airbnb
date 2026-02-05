import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AxiosRequestConfig } from 'axios';

import api from '@/api';
import type { ListingWithLocation } from '@/types';
import type { AsyncStatus } from '@/types/state';

interface ListingsState {
  listings: ListingWithLocation[];
  error: string | null;
  favoriteListingIds: number[];
  status: AsyncStatus;
}

const initialState: ListingsState = {
  listings: [],
  error: null,
  favoriteListingIds: [],
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavoriteListing: (state, action: PayloadAction<number>) => {
      state.favoriteListingIds.push(action.payload);
    },
    removeFavoriteListing: (state, action: PayloadAction<number>) => {
      state.favoriteListingIds = state.favoriteListingIds.filter(
        (id) => id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        const message = action.error.message;

        if (message !== 'Aborted') {
          state.status = 'failed';
          state.error = message ?? null;
        }
      });
  },
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options?: AxiosRequestConfig) => {
    const response = await api.get<ListingWithLocation[]>(
      '/api/listings',
      options
    );
    return response.data;
  }
);

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export default listingsSlice.reducer;
