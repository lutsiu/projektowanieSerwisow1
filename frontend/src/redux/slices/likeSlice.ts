import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Like } from '../../models/models';
import { fetchLikesByPost, fetchLikesByUser, likePost, unlikePost } from '../../api/api';

interface LikesState {
  likes: Like[];
  loading: boolean;
  error: string | null;
}

const initialState: LikesState = {
  likes: [],
  loading: false,
  error: null,
};

// Async thunks
export const getLikesByPost = createAsyncThunk(
  'likes/getLikesByPost',
  async (post_id: number, { rejectWithValue }) => {
    try {
      const response = await fetchLikesByPost(post_id);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch post likes');
    }
  }
);

export const getLikesByUser = createAsyncThunk(
  'likes/getLikesByUser',
  async (user_id: number, { rejectWithValue }) => {
    try {
      const response = await fetchLikesByUser(user_id);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch user likes');
    }
  }
);

export const addLike = createAsyncThunk(
  'likes/addLike',
  async ({ user_id, post_id }: { user_id: number; post_id: number }, { rejectWithValue }) => {
    try {
      const response = await likePost(user_id, post_id);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to like post');
    }
  }
);

export const removeLike = createAsyncThunk(
  'likes/removeLike',
  async ({ user_id, post_id }: { user_id: number; post_id: number }, { rejectWithValue }) => {
    try {
      await unlikePost(user_id, post_id);
      return { user_id, post_id };
    } catch (error) {
      return rejectWithValue('Failed to unlike post');
    }
  }
);

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikesByPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLikesByPost.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload;
      })
      .addCase(getLikesByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getLikesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.likes.push(action.payload);
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.likes = state.likes.filter(
          (like) => !(like.user_id === action.payload.user_id && like.post_id === action.payload.post_id)
        );
      });
  },
});

export default likesSlice.reducer;