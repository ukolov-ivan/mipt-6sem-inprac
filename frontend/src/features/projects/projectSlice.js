import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectAPIService from "../../api";

const initialState = {
    projects: [],
    currentProject: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const getProjects = createAsyncThunk(
    "projects/getAll",
    async (_, thunkAPI) => {
        try {
            return await projectAPIService.getProjects();
        } catch (error) {
            const message =
                (error?.response?.data?.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getProject = createAsyncThunk(
    "projects/getById",
    async (projectId, thunkAPI) => {
        try {
            return await projectAPIService.getProject(projectId);
        } catch (error) {
            const message =
                (error?.response?.data?.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createProject = createAsyncThunk(
    "projects/create",
    async (projectData, thunkAPI) => {
        try {
            return await projectAPIService.createProject(projectData);
        } catch (error) {
            const message =
                (error?.response?.data?.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteProject = createAsyncThunk(
    "projects/delete",
    async (projectId, thunkAPI) => {
        try {
            return await projectAPIService.deleteProject(projectId);
        } catch (error) {
            const message =
                (error?.response?.data?.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projects = action.payload;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(createProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projects.push(action.payload);
                state.currentProject = action.payload;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(getProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentProject = action.payload;
            })
            .addCase(getProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(deleteProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProject.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentProject = null;
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
