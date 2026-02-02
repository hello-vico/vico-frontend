import React from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { Calendar, Filter, Download, Search, MoreHorizontal, CheckCircle2, Clock, XCircle } from 'lucide-react';

const Reservations: React.FC = () => {
    const navItems = [
        { label: 'Dashboard', icon: <Calendar size={20} />, path: '/restaurant/dashboard' },
        { label: 'Prenotazioni', icon: <Calendar size={20} />, path: '/restaurant/reservations' },
        { label: 'Menu', icon: <Calendar size={20} />, path: '/restaurant/menu' },
    ];

    const reservations = [
        { id: 1, name: 'Mario Rossi', guests: 4, time: '13:00', status: 'confirmed', table: 'T-04', phone: '+39 333 123 4567' },
        { id: 2, name: 'Giulia Bianchi', guests: 2, time: '13:30', status: 'pending', table: 'Unassigned', phone: '+39 345 987 6543' },
        { id: 3, name: 'Luca Verdi', guests: 6, time: '20:00', status: 'confirmed', table: 'T-12', phone: '+39 328 111 2222' },
        { id: 4, name: 'Elena Neri', guests: 4, time: '20:30', status: 'cancelled', table: '-', phone: '+39 331 444 5555' },
    ];

    return (
        <BaseLayout
            title="Gestione Prenotazioni"
            navItems={navItems}
            userRole="owner"
            userName="Luigi's Pasta"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cerca per nome o telefono..."
                        className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-medium"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={18} /> Filtri
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Download size={18} /> Esporta
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="p-6 text-xs font-bold uppercase tracking-wider text-slate-400">Cliente</th>
                            <th className="p-6 text-xs font-bold uppercase tracking-wider text-slate-400">Orario</th>
                            <th className="p-6 text-xs font-bold uppercase tracking-wider text-slate-400">Coperti</th>
                            <th className="p-6 text-xs font-bold uppercase tracking-wider text-slate-400">Tavolo</th>
                            <th className="p-6 text-xs font-bold uppercase tracking-wider text-slate-400">Stato</th>
                            <th className="p-6 text-xs font-bold uppercase tracking-wider text-slate-400">Azioni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {reservations.map((res) => (
                            <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                            {res.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{res.name}</p>
                                            <p className="text-xs text-slate-500">{res.phone}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="font-semibold text-slate-700">{res.time}</span>
                                </td>
                                <td className="p-6 font-medium text-slate-600">
                                    {res.guests} persone
                                </td>
                                <td className="p-6">
                                    <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-500 border border-slate-200">
                                        {res.table}
                                    </span>
                                </td>
                                <td className="p-6">
                                    {res.status === 'confirmed' && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1 w-fit">
                                            <CheckCircle2 size={10} /> Confermato
                                        </span>
                                    )}
                                    {res.status === 'pending' && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-1 w-fit">
                                            <Clock size={10} /> In attesa
                                        </span>
                                    )}
                                    {res.status === 'cancelled' && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100 flex items-center gap-1 w-fit">
                                            <XCircle size={10} /> Annullato
                                        </span>
                                    )}
                                </td>
                                <td className="p-6">
                                    <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </BaseLayout>
    );
};

export default Reservations;
