import api from './axiosClient';
import type { Prenotazione } from '../types';

export const getReservationByToken = async (token: string): Promise<Prenotazione> => {
    // MOCK FOR TESTING
    if (token === 'abc123def456ghi789') {
        return new Promise((resolve) => setTimeout(() => resolve({
            id: 999,
            ristorante_id: 1,
            nome_cliente: "Mario Rossi",
            email_cliente: "mario@example.com",
            telefono_cliente: "3331234567",
            data_ora: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            numero_persone: 4,
            note: "Tavolo vicino alla finestra se possibile",
            stato: 'confermata'
        }), 500));
    }

    const response = await api.get(`/prenotazioni/token/${token}`);
    return response.data;
};

export const updateReservationByToken = async (token: string, data: Partial<Prenotazione>): Promise<Prenotazione> => {
    // MOCK FOR TESTING
    if (token === 'abc123def456ghi789') {
        return new Promise((resolve) => setTimeout(() => resolve({
            id: 999,
            ristorante_id: 1,
            nome_cliente: "Mario Rossi",
            email_cliente: "mario@example.com",
            telefono_cliente: "3331234567",
            data_ora: data.data_ora || new Date(Date.now() + 86400000).toISOString(),
            numero_persone: data.numero_persone || 4,
            note: data.note || "Tavolo vicino alla finestra se possibile",
            stato: 'confermata'
        }), 500));
    }

    const response = await api.put(`/prenotazioni/token/${token}`, data);
    return response.data;
};

export const cancelReservationByToken = async (token: string): Promise<void> => {
    // MOCK FOR TESTING
    if (token === 'abc123def456ghi789') {
        return new Promise((resolve) => setTimeout(resolve, 500));
    }

    await api.post(`/prenotazioni/token/${token}/cancel`);
};
