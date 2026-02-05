import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';
import type { CreateReviewInput, Review } from '@/types';
import type { AsyncStatus } from '@/types/state';

interface ReviewsState {
  reviews: Review[];
  error: string | null | undefined;
  status: AsyncStatus;
  createStatus: AsyncStatus;
  updateStatus: AsyncStatus;
  deleteStatus: AsyncStatus;
}

const initialState: ReviewsState = {
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
  async (listingId: number) => {
    const response = await api.get<Review[]>('/api/reviews', {
      params: { listingId },
    });
    return response.data;
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData: CreateReviewInput) => {
    const response = await api.post<Review>('/api/reviews', reviewData);
    return response.data;
  }
);

interface UpdateReviewParams {
  id: number;
  rating: number;
  comment: string;
}

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ id, rating, comment }: UpdateReviewParams) => {
    const response = await api.put<Review>(`/api/reviews/${id}`, {
      rating,
      comment,
    });
    return response.data;
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId: number) => {
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
