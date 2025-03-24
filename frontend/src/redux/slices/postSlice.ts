import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../models/models';
import { fetchPosts, fetchPostById, fetchPostsByUser, createPost, deletePost } from '../../api/api';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunks
export const getPosts = createAsyncThunk('posts/getPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchPosts();
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch posts');
  }
});

export const addPost = createAsyncThunk('posts/addPost', async (post: Omit<Post, 'id' | 'created_at'>, { rejectWithValue }) => {
  try {
    const response = await createPost(post);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to create post');
  }
});

export const removePost = createAsyncThunk('posts/removePost', async (id: number, { rejectWithValue }) => {
  try {
    await deletePost(id);
    return id;
  } catch (error) {
    return rejectWithValue('Failed to delete post');
  }
});

// Slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
