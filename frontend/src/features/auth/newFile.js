import { authApi } from './authService';

// Request interceptor to convert request data to snake_case
authApi.interceptors.request.use((config) => {
    if (config.data) {
        config.data = toSnakeCase(config.data);
    }
    return config;
});
