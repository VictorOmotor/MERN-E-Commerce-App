import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';

const initialState = {
  loggedIn: false,
  user: null,
  error: false,
  success: false,
  loading: false,
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getLoginStatus = createAsyncThunk('auth/getLoginStatus', async (_, thunkAPI) => {
  try {
    return await authService.getLoginStatus();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const updateUserInfo = createAsyncThunk('auth/updateUserInfo', async (formData, thunkAPI) => {
  try {
    return await authService.updateUserInfo(formData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const updateUserPhoto = createAsyncThunk('auth/updateUserPhoto', async (userData, thunkAPI) => {
  try {
    return await authService.updateUserPhoto(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
      state.message = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loggedIn = true;
        state.user = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loggedIn = true;
        state.user = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loggedIn = false;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(getLoginStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loggedIn = action.payload;
        if(action.payload.message === "Access denied, invalid token."){
          state.loggedIn = false
        }
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loggedIn = action.payload;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload)
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loggedIn = true;
        state.user = action.payload;
        toast.success(action.payload.message)
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload)
      })
      .addCase(updateUserPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loggedIn = true;
        state.user = action.payload;
        toast.success(action.payload.message)
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload)
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
