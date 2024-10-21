import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectAPIService from '../../api';

export const getContributors = createAsyncThunk(
    'contributors/getContributors',
    async (projectId, thunkAPI) => {
        try {
            return await projectAPIService.getContributors(projectId);
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const addContributor = createAsyncThunk(
    'contributors/addContributor',
    async ({ projectId, userId }, thunkAPI) => {
        try {
            return await projectAPIService.addContributor(projectId, userId);
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const removeContributor = createAsyncThunk(
    'contributors/removeContributor',
    async ({ projectId, userId }, thunkAPI) => {
        try {
            return await projectAPIService.removeContributor(projectId, userId);
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    },
);

const contributorsSlice = createSlice({
    name: 'contributors',
    initialState: {
        contributors: [],
        isLoading: true,
        isError: false,
        message: '',
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContributors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getContributors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contributors = action.payload;
            })
            .addCase(getContributors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(addContributor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addContributor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contributors.push(action.payload);
            })
            .addCase(addContributor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(removeContributor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeContributor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contributors = state.contributors.filter(
                    (contributor) => contributor.id !== action.payload.id,
                );
            })
            .addCase(removeContributor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            });
    },
});

export const { reset } = contributorsSlice.actions;
export default contributorsSlice.reducer;
