import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Utensils, Settings, Plus } from 'lucide-react';
import { getRistoranti } from '../../api/ristoranti';
import { RistoranteCard } from '../../features/ristoranti/RistoranteCard';
import type { Ristorante } from '../../types';

const AdminRestaurants: React.FC = () => {
    const { data: ristoranti, isLoading, error } = useQuery<Ristorante[]>({
        queryKey: ['ristoranti'],
        queryFn: () => getRistoranti(),
    });

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Gestione Ristoranti</h2>
                    <p className="text-slate-500 mt-1">
                        Visualizza, gestisci e configura tutti i ristoranti presenti sulla piattaforma.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200 hover:-translate-y-0.5 active:translate-y-0">
                    <Plus size={20} />
                    Nuovo Ristorante
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-72 rounded-3xl bg-white animate-pulse border border-slate-100 shadow-sm" />
                    ))}
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 p-6 rounded-3xl text-red-600 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                        <Settings size={24} />
                    </div>
                    <div>
                        <p className="font-bold">Errore di caricamento</p>
                        <p className="text-sm opacity-80">
                            Non è stato possibile caricare i ristoranti. Verifica la connessione al server.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ristoranti?.map((ristorante) => (
                        <RistoranteCard
                            key={ristorante.id}
                            ristorante={ristorante}
                            onManage={(id) => console.log('Managing:', id)}
                        />
                    ))}
                    {ristoranti?.length === 0 && (
                        <div className="col-span-full py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Utensils size={40} className="text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Nessun ristorante trovato</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Non ci sono ancora ristoranti registrati nel sistema. Clicca sul pulsante in alto per aggiungerne uno.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AdminRestaurants;

