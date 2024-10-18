import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contributorReducer from '../features/projects/contributorSlice';
import issuesReducer from '../features/projects/issueSlice';
import projectReducer from '../features/projects/projectSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        issues: issuesReducer,
        contributors: contributorReducer,
    },
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});
