import React from 'react';
import type { Ristorante } from '../../types';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

interface RistoranteCardProps {
    ristorante: Ristorante;
    onManage: (id: number) => void;
}

export const RistoranteCard: React.FC<RistoranteCardProps> = ({ ristorante, onManage }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all hover:shadow-md hover:border-brand-primary/20 group">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-brand-primary transition-colors">
                    {ristorante.nome}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${ristorante.is_active ? 'bg-indigo-50 text-[#6366F1]' : 'bg-slate-50 text-slate-500'}`}>
                    {ristorante.is_active ? 'Attivo' : 'Inattivo'}
                </span>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-500 text-sm">
                    <MapPin size={16} className="mr-2 text-slate-400" />
                    {ristorante.indirizzo}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                    <Phone size={16} className="mr-2 text-slate-400" />
                    {ristorante.telefono}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                    <Clock size={16} className="mr-2 text-slate-400" />
                    Slot: {ristorante.slot_prenotazione} min
                </div>
            </div>

            <button
                onClick={() => onManage(ristorante.id)}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-50 text-slate-700 font-medium hover:bg-brand-primary hover:text-white transition-all group/btn"
            >
                Gestisci
                <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};
