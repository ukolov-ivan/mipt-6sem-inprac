import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import ContributorsPage from './pages/ContributorsPage';
import CreateIssuePage from './pages/CreateIssuePage';
import CreateProjectPage from './pages/CreateProjectPage';
import EditIssuePage from './pages/EditIssuePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import ProjectsPage from './pages/ProjectsPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route
                        path="/projects/create"
                        element={<CreateProjectPage />}
                    />
                    <Route
                        path="/projects/:projectId"
                        element={<ProjectPage />}
                    />
                    <Route
                        path="/projects/:projectId/issues/"
                        element={<ProjectPage />}
                    />
                    <Route
                        path="/projects/:projectId/issues/create"
                        element={<CreateIssuePage />}
                    />
                    <Route
                        path="/projects/:projectId/issues/:issueId/edit"
                        element={<EditIssuePage />}
                    />
                    <Route
                        path="/projects/:projectId/contributors/"
                        element={<ContributorsPage />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer />
            </main>
        </Router>
    );
};

export default App;
