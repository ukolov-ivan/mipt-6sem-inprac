import axios from "axios";

const REGISTER_URL = "/api/v1/auth/users/";
const LOGIN_URL = "/api/v1/auth/jwt/create/";

const register = async (userData) => {
	const response = await axios.post(REGISTER_URL, userData);
	return response.data;
};

const login = async (userData) => {
	const response = await axios.post(LOGIN_URL, userData);
	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const logout = () => localStorage.removeItem("user");



const authService = { register, login, logout };

export default authService;
