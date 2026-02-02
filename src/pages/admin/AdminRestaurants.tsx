import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Utensils, Settings, Plus, XCircle } from 'lucide-react';
import { createRistorante, getRistoranti } from '../../api/ristoranti';
import { RistoranteCard } from '../../features/ristoranti/RistoranteCard';
import { RistoranteForm } from '../../features/ristoranti/RistoranteForm';
import type { CreateRistoranteDto, Ristorante } from '../../types';

const AdminRestaurants: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { data: ristoranti, isLoading, error } = useQuery<Ristorante[]>({
        queryKey: ['ristoranti'],
        queryFn: () => getRistoranti(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateRistoranteDto) => createRistorante(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ristoranti'] });
            setIsModalOpen(false);
            setErrorMessage(null);
        },
        onError: (err: any) => {
            const msg =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                'Si è verificato un errore durante la creazione del ristorante.';
            setErrorMessage(msg);
        },
    });

    const handleCreate = (values: CreateRistoranteDto) => {
        setErrorMessage(null);
        createMutation.mutate(values);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Gestione Ristoranti</h2>
                    <p className="text-slate-500 mt-1">
                        Visualizza, gestisci e configura tutti i ristoranti presenti sulla piattaforma.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setErrorMessage(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-brand-gradient text-white px-6 py-3 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Plus size={20} />
                    Nuovo Ristorante
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl mx-4 p-6 md:p-7 relative">
                        <button
                            onClick={() => {
                                if (!createMutation.isPending) {
                                    setIsModalOpen(false);
                                    setErrorMessage(null);
                                }
                            }}
                            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                        >
                            <XCircle size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-slate-900 mb-1">Nuovo ristorante</h3>
                        <p className="text-sm text-slate-500 mb-4">
                            Inserisci i dati principali del nuovo ristorante. Potrai completare i dettagli in un secondo momento.
                        </p>

                        {errorMessage && (
                            <div className="mb-4 flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                                <span className="mt-0.5 text-red-500">!</span>
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <RistoranteForm
                            onSubmit={handleCreate}
                            onCancel={() => {
                                if (!createMutation.isPending) {
                                    setIsModalOpen(false);
                                    setErrorMessage(null);
                                }
                            }}
                            isSubmitting={createMutation.isPending}
                        />
                    </div>
                </div>
            )}

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

