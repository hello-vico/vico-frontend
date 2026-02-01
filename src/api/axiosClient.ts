import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://vico-backend-526613278290.europe-west1.run.app/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors for auth token if needed
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('vico_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('vico_token');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
