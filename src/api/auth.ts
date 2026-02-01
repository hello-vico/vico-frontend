import api from './axiosClient';

export interface LoginRequest {
    username?: string;
    email?: string;
    password?: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const login = async (data: LoginRequest | FormData): Promise<LoginResponse> => {
    // If the backend expects OAuth2 Password Flow (form-data)
    const response = await api.post('/auth/login', data, {
        headers: {
            'Content-Type': data instanceof FormData ? 'application/x-www-form-urlencoded' : 'application/json'
        }
    });
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};
