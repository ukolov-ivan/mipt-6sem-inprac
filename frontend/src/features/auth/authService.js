import axios from 'axios';

const REGISTER_URL = '/api/v1/auth/users/';
const LOGIN_URL = '/api/v1/auth/jwt/create/';

/**
 * @typedef {Object} RegisterUserDetails
 * @property {string} username - The username of the user.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password for the user.
 * @property {string} re_password - The password confirmation for the user.
 */

/**
 * TODO -- Fix acccording to api
 *
 * @typedef {Object} User
 * @property {string} id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 */

/**
 * @typedef {Object} LoginUserDetails
 * @property {string} email - The email of the user.
 * @property {string} password - The password for the user.
 */

/**
 * @param {RegisterUserDetails} userData
 * @returns {Promise<User>} The response data from the registration API.
 */
const register = async (userData) => {
    const response = await axios.post(REGISTER_URL, userData);
    return response.data;
};

/**
 * @param {LoginUserDetails} userData
 * @returns {Promise<User>} The response data from the login API.
 */
const login = async (userData) => {
    const response = await axios.post(LOGIN_URL, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

/** @returns {void} */
const logout = () => localStorage.removeItem('user');

const authService = { register, login, logout };

export default authService;
