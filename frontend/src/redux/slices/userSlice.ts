import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../models/models';
import {
  fetchUsers,
  fetchUserById,
  createUser,
  deleteUser,
} from '../../api/api';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunks
export const getUsers = createAsyncThunk('users/getUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchUsers();
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch users');
  }
});

export const getUserById = createAsyncThunk('users/getUserById', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetchUserById(id);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch user');
  }
});

export const addUser = createAsyncThunk('users/addUser', async (user: Omit<User, 'id' | 'created_at'>, { rejectWithValue }) => {
  try {
    const response = await createUser(user);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to create user');
  }
});

export const removeUser = createAsyncThunk('users/removeUser', async (id: number, { rejectWithValue }) => {
  try {
    await deleteUser(id);
    return id;
  } catch (error) {
    return rejectWithValue('Failed to delete user');
  }
});

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
