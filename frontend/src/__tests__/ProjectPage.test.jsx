// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import { createRoot } from "react-dom/client";
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import configureStore from 'redux-mock-store';
// import ProjectPage from '../pages/ProjectPage';

// // Mock the necessary functions and components
// jest.mock('react-toastify', () => ({
//     toast: {
//         error: jest.fn(),
//     },
// }));

// const mockStore = configureStore([]);
// const getIssuesForProject = jest.fn();
// const getProject = jest.fn();

// describe('ProjectPage Component', () => {
//     let store;

//     beforeEach(() => {
//         store = mockStore({
//             projects: {
//                 currentProject: { name: 'Test Project', description: 'Project Description' },
//                 isLoading: false,
//                 isError: false,
//                 message: '',
//             },
//             issues: {
//                 issues: [],
//                 isLoading: false,
//                 isError: false,
//                 message: '',
//             },
//         });

//         jest.clearAllMocks();
//     });

//     test('renders loading spinner when project and issues are loading', () => {
//         store = mockStore({
//             projects: {
//                 currentProject: {},
//                 isLoading: true,
//                 isError: false,
//             },
//             issues: {
//                 issues: [],
//                 isLoading: true,
//             },
//         });

//         render(
//             <Provider store={store}>
//                 <Router>
//                     <ProjectPage />
//                 </Router>
//             </Provider>
//         );

//         expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Adjust according to your Spinner output
//     });

//     test('renders project details and issues', () => {
//         store = mockStore({
//             projects: {
//                 currentProject: { name: 'Test Project', description: 'Project Description' },
//                 isLoading: false,
//                 isError: false,
//             },
//             issues: {
//                 issues: [
//                     { id: 1, title: 'Issue 1', description: 'Description 1', status: 'P', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
//                 ],
//                 isLoading: false,
//                 isError: false,
//             },
//         });

//         render(
//             <Provider store={store}>
//                 <Router>
//                     <ProjectPage />
//                 </Router>
//             </Provider>
//         );

//         expect(screen.getByText('Test Project')).toBeInTheDocument();
//         expect(screen.getByText('Project Description')).toBeInTheDocument();
//         expect(screen.getByText('Issue 1')).toBeInTheDocument();
//         expect(screen.getByText('Pending')).toBeInTheDocument(); // Status label
//     });

//     test('displays error messages when there are errors', () => {
//         store = mockStore({
//             projects: {
//                 currentProject: {},
//                 isLoading: false,
//                 isError: true,
//                 message: 'Project Load Error',
//             },
//             issues: {
//                 issues: [],
//                 isLoading: false,
//                 isError: true,
//                 message: 'Issues Load Error',
//             },
//         });

//         // const container = document.getElementById("root")
//         const root = createRoot(container)
//         root.render(

//             <Provider store={store}>
//                 <Router>
//                     <ProjectPage />
//                 </Router>
//             </Provider>
//         );

//         expect(toast.error).toHaveBeenCalledWith('Project Load Error', { icon: '😭' });
//         expect(toast.error).toHaveBeenCalledWith('Issues Load Error', { icon: '😭' });
//     });

//     test('displays a message if there are no issues', () => {
//         store = mockStore({
//             projects: {
//                 currentProject: { name: 'Test Project', description: 'Project Description' },
//                 isLoading: false,
//                 isError: false,
//             },
//             issues: {
//                 issues: [],
//                 isLoading: false,
//                 isError: false,
//             },
//         });

//         render(
//             <Provider store={store}>
//                 <Router>
//                     <ProjectPage />
//                 </Router>
//             </Provider>
//         );

//         expect(screen.getByText("This project doesn't have any issues.")).toBeInTheDocument();
//     });
// });