import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

/**
 * @typedef {Object} AuthState
 * @property {import('./authService').User | null} user
 * @property {boolean} isError
 * @property {boolean} isLoading
 * @property {boolean} isSuccess
 * @property {string} message
 */

/** @type {import('./authService').User} */
const user = JSON.parse(localStorage.getItem('user'));

/** @type {AuthState} */
const initialState = {
    user: user || null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const register = createAsyncThunk(
    'auth/register',
    /**
     * @type {import('@reduxjs/toolkit').AsyncThunkPayloadCreator<
     *     import('./authService').User,
     *     import('./authService').RegisterUserDetails,
     *     { state: AuthState; rejectValue: string }
     * >}
     */
    async (userData, thunkAPI) => {
        try {
            const result = await authService.register(userData);
            return result;
        } catch (error) {
            /** @type {string} */
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const login = createAsyncThunk(
    'auth/login',
    /**
     * @type {import('@reduxjs/toolkit').AsyncThunkPayloadCreator<
     *     import('./authService').User,
     *     import('./authService').LoginUserDetails,
     *     { state: AuthState; rejectValue: string }
     * >}
     */
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            /** @type {string} */
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
