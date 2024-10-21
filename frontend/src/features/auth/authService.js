import axios from 'axios';
import { toCamelCase, toSnakeCase } from './utils';

const REGISTER_URL = '/api/v1/auth/users/';
const LOGIN_URL = '/api/v1/auth/jwt/create/';

/**
 * @typedef {Object} RegisterUserDetails
 * @property {string} username - The username of the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password for the user.
 * @property {string} rePassword - The password confirmation for the user.
 */

export const authApi = axios.create({
    baseURL: 'http://localhost:8000/',
});

authApi.interceptors.request.use((config) => {
    if (config.data) {
        config.data = toSnakeCase(config.data);
    }
    return config;
});

authApi.interceptors.response.use((response) => {
    if (response.data) {
        response.data = toCamelCase(response.data);
    }
    return response;
});

/**
 * TODO -- Fix acccording to api
 *
 * @typedef {Object} User
 * @property {string} id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 */

/**
 * @param {RegisterUserDetails} userData
 * @returns {Promise<User>} The response data from the registration API.
 */
const register = async (userData) => {
    const response = await authApi.post(REGISTER_URL, userData);
    return response.data;
};

/**
 * @typedef {Object} LoginUserDetails
 * @property {string} email - The email of the user.
 * @property {string} password - The password for the user.
 */

/**
 * @param {LoginUserDetails} userData
 * @returns {Promise<User>} The response data from the login API.
 */
const login = async (userData) => {
    const response = await authApi.post(LOGIN_URL, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

/** @returns {void} */
const logout = () => localStorage.removeItem('user');

const authService = { register, login, logout };

export default authService;
