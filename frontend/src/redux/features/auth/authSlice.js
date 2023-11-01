import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService  from './authService'
import {toast} from 'react-toastify'

const initialState = {
    loggedIn: false,
    user: null,
    error: false,
    success: false,
    loading: false,
    message: '',
}

export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
          return await authService.register(userData) 
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
        state.error = false
        state.success = false
        state.loading = false
        state.message = ''
    },
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
            state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.loggedIn = true
            state.user = action.payload
            toast.success('Registration successful')
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
            state.user = null
            toast.success(action.payload)
        })
    }
  
});

export const {resetAuth} = authSlice.actions

export default authSlice.reducer