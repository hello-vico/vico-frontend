import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRistoranti } from '../api/ristoranti';
import { RistoranteCard } from '../features/ristoranti/RistoranteCard';
import type { Ristorante } from '../types';
import { Plus, LayoutDashboard, Utensils, Calendar as CalendarIcon, Settings, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { data: ristoranti, isLoading, error } = useQuery<Ristorante[]>({
        queryKey: ['ristoranti'],
        queryFn: () => getRistoranti(),
    });

    const handleManage = (id: number) => {
        console.log('Managing restaurant:', id);
    };

    const handleLogout = () => {
        localStorage.removeItem('vico_token');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2 text-brand-primary font-bold text-2xl tracking-tight">
                        <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white">V</div>
                        VICO
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-primary/10 text-brand-primary font-medium">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </a>
                    <a href="/dashboard/ristoranti" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                        <Utensils size={20} />
                        Ristoranti
                    </a>
                    <a href="/dashboard/prenotazioni" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                        <CalendarIcon size={20} />
                        Prenotazioni
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                        <Settings size={20} />
                        Impostazioni
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-brand-secondary transition-colors shadow-sm">
                            <Plus size={18} />
                            Nuovo Ristorante
                        </button>
                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="User Avatar" />
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Benvenuto, Admin 👋</h2>
                        <p className="text-slate-500">Gestisci i tuoi ristoranti e le prenotazioni in tempo reale.</p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 rounded-2xl bg-white animate-pulse border border-slate-100" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600">
                            Si è verificato un errore nel caricamento dei ristoranti. Assicurati che il backend sia attivo.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ristoranti?.map((ristorante) => (
                                <RistoranteCard
                                    key={ristorante.id}
                                    ristorante={ristorante}
                                    onManage={handleManage}
                                />
                            ))}
                            {ristoranti?.length === 0 && (
                                <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                                    <Utensils size={48} className="mx-auto text-slate-300 mb-4" />
                                    <h3 className="text-lg font-medium text-slate-800 mb-1">Nessun ristorante trovato</h3>
                                    <p className="text-slate-500">Inizia aggiungendo il tuo primo ristorante.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
