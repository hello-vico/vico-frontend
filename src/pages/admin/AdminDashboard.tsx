import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRistoranti } from '../../api/ristoranti';
import { RistoranteCard } from '../../features/ristoranti/RistoranteCard';
import type { Ristorante } from '../../types';
import { Utensils, Users, Settings, Plus, TrendingUp, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { data: ristoranti, isLoading, error } = useQuery<Ristorante[]>({
        queryKey: ['ristoranti'],
        queryFn: () => getRistoranti(),
    });

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Restaurants" value={ristoranti?.length || 0} icon={<Utensils className="text-[#6366F1]" />} trend="+2 this month" />
                <StatCard title="Total Bookings" value="1,284" icon={<Calendar className="text-blue-600" />} trend="+12% vs last month" />
                <StatCard title="Active Users" value="842" icon={<Users className="text-purple-600" />} trend="+5% today" />
                <StatCard title="Revenue Share" value="€4.2k" icon={<TrendingUp className="text-amber-600" />} trend="+8% vs last week" />
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Ristoranti Registrati</h2>
                    <p className="text-slate-500 mt-1">Gestisci e monitora tutti i ristoranti della piattaforma.</p>
                </div>
                <button className="flex items-center gap-2 bg-brand-gradient text-white px-6 py-3 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0">
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
                        <p className="text-sm opacity-80">Non è stato possibile caricare i ristoranti. Verifica la connessione al server.</p>
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
                            <p className="text-slate-500 max-w-sm mx-auto">Non ci sono ancora ristoranti registrati nel sistema. Clicca sul pulsante in alto per aggiungerne uno.</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ReactNode, trend: string }> = ({ title, value, icon, trend }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                {icon}
            </div>
            <span className="text-[10px] font-bold text-[#6366F1] bg-indigo-50 px-2 py-1 rounded-lg">
                {trend}
            </span>
        </div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
);

export default AdminDashboard;
