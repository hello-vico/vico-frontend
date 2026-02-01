export interface Ristorante {
    id: number;
    nome: string;
    indirizzo: string;
    telefono: string;
    p_iva: string;
    slot_prenotazione: number;
    is_active: boolean;
    created_at: string;
}

export interface CreateRistoranteDto {
    nome: string;
    indirizzo: string;
    telefono: string;
    p_iva: string;
    slot_prenotazione: number;
}

export interface Sala {
    id: number;
    ristorante_id: number;
    nome: string;
    descrizione?: string;
}

export interface Tavolo {
    id: number;
    sala_id: number;
    numero: string;
    posti: number;
    is_active: boolean;
}

export interface Prenotazione {
    id: number;
    ristorante_id: number;
    tavolo_id?: number;
    nome_cliente: string;
    email_cliente?: string;
    telefono_cliente: string;
    data_ora: string;
    numero_persone: number;
    note?: string;
    stato: 'confermata' | 'cancellata' | 'completata';
}
