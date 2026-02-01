import api from './axiosClient';
import type { Ristorante, CreateRistoranteDto } from '../types';

export const getRistoranti = async (): Promise<Ristorante[]> => {
    const response = await api.get('/ristoranti/');
    return response.data;
};

export const getRistorante = async (id: number): Promise<Ristorante> => {
    const response = await api.get(`/ristoranti/${id}/`);
    return response.data;
};

export const createRistorante = async (data: CreateRistoranteDto): Promise<Ristorante> => {
    const response = await api.post('/ristoranti/', data);
    return response.data;
};

export const updateRistorante = async (id: number, data: Partial<CreateRistoranteDto>): Promise<Ristorante> => {
    const response = await api.patch(`/ristoranti/${id}/`, data);
    return response.data;
};

export const deleteRistorante = async (id: number): Promise<void> => {
    await api.delete(`/ristoranti/${id}/`);
};
