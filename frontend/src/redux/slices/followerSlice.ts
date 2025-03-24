import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Follower } from '../../models/models';
import { fetchFollowers, fetchFollowing, followUser, unfollowUser } from '../../api/api';

interface FollowersState {
  followers: Follower[];
  following: Follower[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowersState = {
  followers: [],
  following: [],
  loading: false,
  error: null,
};

// Async thunks
export const getFollowers = createAsyncThunk(
  'followers/getFollowers',
  async (user_id: number, { rejectWithValue }) => {
    try {
      const response = await fetchFollowers(user_id);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch followers');
    }
  }
);

export const getFollowing = createAsyncThunk(
  'followers/getFollowing',
  async (user_id: number, { rejectWithValue }) => {
    try {
      const response = await fetchFollowing(user_id);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch following');
    }
  }
);

export const addFollower = createAsyncThunk(
  'followers/addFollower',
  async ({ follower_id, following_id }: { follower_id: number; following_id: number }, { rejectWithValue }) => {
    try {
      const response = await followUser(follower_id, following_id);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to follow user');
    }
  }
);

export const removeFollower = createAsyncThunk(
  'followers/removeFollower',
  async ({ follower_id, following_id }: { follower_id: number; following_id: number }, { rejectWithValue }) => {
    try {
      await unfollowUser(follower_id, following_id);
      return { follower_id, following_id };
    } catch (error) {
      return rejectWithValue('Failed to unfollow user');
    }
  }
);

const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(addFollower.fulfilled, (state, action) => {
        state.followers.push(action.payload);
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        state.followers = state.followers.filter(
          (follower) => !(follower.follower_id === action.payload.follower_id && 
                         follower.following_id === action.payload.following_id)
        );
      });
  },
});

export default followersSlice.reducer;