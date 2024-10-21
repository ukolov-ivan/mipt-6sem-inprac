import axios from 'axios';

const defaultOptions = {
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
};

const get_instance = () => {
    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = JSON.parse(localStorage.getItem('user'))?.access;
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });
    return instance;
};

const getUser = async (userId) => {
    const response = await get_instance().get(`/api/v1/users/${userId}`);
    return response.data;
};

const getProjects = async () => {
    const response = await get_instance().get('/api/v1/projects/');
    return response.data;
};

const getProject = async (projectId) => {
    const response = await get_instance().get(`/api/v1/projects/${projectId}`);
    return response.data;
};

const createProject = async (projectData) => {
    const response = await get_instance().post(
        '/api/v1/projects/',
        projectData,
    );
    return response.data;
};

const deleteProject = async (projectId) => {
    const response = await get_instance().delete(
        `/api/v1/projects/${projectId}/`,
    );
    return response.data;
};

const createIssue = async (projectId, issueData) => {
    issueData.project = projectId;
    const response = await get_instance().post(
        `/api/v1/projects/${projectId}/issues/`,
        issueData,
    );
    return response.data;
};

const getIssue = async (projectId, issueId) => {
    const response = await get_instance().get(
        `/api/v1/projects/${projectId}/issues/${issueId}/`,
    );
    return response.data;
};

const getIssuesForProject = async (projectId) => {
    const response = await get_instance().get(
        `/api/v1/projects/${projectId}/issues/`,
    );
    return response.data;
};

const updateIssue = async (projectId, issueId, issueData) => {
    const response = await get_instance().patch(
        `/api/v1/projects/${projectId}/issues/${issueId}/`,
        issueData,
    );
    return response.data;
};

const getContributors = async (projectId) => {
    const response = await get_instance().get(`/api/v1/projects/${projectId}/`);
    return response.data.contributors;
};

const addContributor = async (projectId, userId) => {
    const response = await get_instance().post(
        `/api/v1/projects/${projectId}/contributors/`,
        { project: projectId, user: userId },
    );
    return response.data;
};

const removeContributor = async (projectId, userId) => {
    const response = await get_instance().delete(
        `/api/v1/projects/${projectId}/contributors/${userId}/`,
    );
    return response.data;
};

const projectAPIService = {
    getUser,
    getProjects,
    getProject,
    deleteProject,
    createProject,
    createIssue,
    getIssue,
    getIssuesForProject,
    updateIssue,
    getContributors,
    addContributor,
    removeContributor,
};

export default projectAPIService;
