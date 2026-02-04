import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  bookings: [],
  error: null,
  status: 'idle',
  createStatus: 'idle',
  cancelStatus: 'idle',
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = 'idle';
    },
    resetCancelStatus: (state) => {
      state.cancelStatus = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        const message = action.error.message;
        if (message !== 'Aborted') {
          state.status = 'failed';
          state.error = message;
        }
      })
      .addCase(createBooking.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.cancelStatus = 'loading';
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.cancelStatus = 'succeeded';
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.cancelStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    const response = await api.get('/api/bookings');
    return response.data;
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData) => {
    const response = await api.post('/api/bookings', bookingData);
    return response.data;
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId) => {
    const response = await api.delete(`/api/bookings/${bookingId}`);
    return response.data;
  }
);

export const { resetCreateStatus, resetCancelStatus } = bookingsSlice.actions;

export default bookingsSlice.reducer;
