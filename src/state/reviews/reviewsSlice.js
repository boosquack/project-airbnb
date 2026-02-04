import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  reviews: [],
  error: null,
  status: 'idle',
  createStatus: 'idle',
  updateStatus: 'idle',
  deleteStatus: 'idle',
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = 'idle';
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = 'idle';
    },
    clearReviews: (state) => {
      state.reviews = [];
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        const message = action.error.message;
        if (message !== 'Aborted') {
          state.status = 'failed';
          state.error = message;
        }
      })
      .addCase(createReview.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateReview.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteReview.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.meta.arg
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (listingId) => {
    const response = await api.get('/api/reviews', {
      params: { listingId },
    });
    return response.data;
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData) => {
    const response = await api.post('/api/reviews', reviewData);
    return response.data;
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ id, rating, comment }) => {
    const response = await api.put(`/api/reviews/${id}`, { rating, comment });
    return response.data;
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    await api.delete(`/api/reviews/${reviewId}`);
    return reviewId;
  }
);

export const {
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  clearReviews,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
