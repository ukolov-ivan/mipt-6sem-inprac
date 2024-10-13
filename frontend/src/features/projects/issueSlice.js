import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectAPIService from "../../api";

const initialState = {
    issues: [],
    currentIssue: null,
    isError: false,
    isLoading: true,
    isSuccess: false,
    message: "",
};

export const getIssuesForProject = createAsyncThunk(
    "issues",
    async (projectId, thunkAPI) => {
        try {
            return await projectAPIService.getIssuesForProject(projectId);
        } catch (error) {
            const message =
                (error?.response?.data?.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getIssue = createAsyncThunk(
    "issues/getIssue",
    async ({ projectId, issueId }, thunkAPI) => {
        try {

            return await projectAPIService.getIssue(projectId, issueId);
        } catch (error) {
            const message =
                (error?.response?.data?.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createIssue = createAsyncThunk(
    'issues/createIssue',
    async ({ projectId, issueData }, thunkAPI) => {
        try {
            return await projectAPIService.createIssue(projectId, issueData);
        } catch (error) {
            const message =
                (error?.response?.data?.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        };
    }
);

export const updateIssue = createAsyncThunk(
    'issues/updateIssue',
    async ({ projectId, issueId, issueData }, thunkAPI) => {
        try {
            return await projectAPIService.updateIssue(projectId, issueId, issueData);
        } catch (error) {
            const message =
                (error?.response?.data?.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const issueSlice = createSlice({
    name: "issue",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIssuesForProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIssuesForProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.issues = action.payload;
            })
            .addCase(getIssuesForProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getIssue.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIssue.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentIssue = action.payload;
            })
            .addCase(getIssue.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createIssue.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createIssue.fulfilled, (state, action) => {
                state.isLoading = false;
                state.issues.push(action.payload);
            })
            .addCase(createIssue.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })
            .addCase(updateIssue.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateIssue.fulfilled, (state, action) => {
                state.isLoading = false;
                state.issues.push(action.payload);
            })
            .addCase(updateIssue.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })

    },
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
