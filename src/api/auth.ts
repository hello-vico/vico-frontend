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

export const login = async (data: LoginRequest | URLSearchParams): Promise<LoginResponse> => {
    const isForm = data instanceof URLSearchParams;
    const response = await api.post('/auth/login', data, {
        headers: {
            'Content-Type': isForm ? 'application/x-www-form-urlencoded' : 'application/json'
        }
    });
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};
