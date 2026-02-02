import React from 'react';
import { Users, ShieldCheck, Mail } from 'lucide-react';

const mockUsers = [
    { id: 1, name: 'Mario Rossi', email: 'mario.rossi@example.com', role: 'Amministratore' },
    { id: 2, name: 'Giulia Bianchi', email: 'giulia.bianchi@example.com', role: 'Ristoratore' },
    { id: 3, name: 'Luca Verdi', email: 'luca.verdi@example.com', role: 'Staff' },
];

const AdminUsers: React.FC = () => {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Gestione Utenti</h2>
                    <p className="text-slate-500 mt-1">
                        Gestisci i permessi e i ruoli degli utenti che accedono alla piattaforma.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900">Utenti Piattaforma</p>
                        <p className="text-xs text-slate-500">
                            In una fase successiva potrai collegare qui la gestione utenti dell&apos;API.
                        </p>
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {mockUsers.map((user) => (
                        <div key={user.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                    {user.name[0]}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{user.name}</p>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <Mail size={12} /> {user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                                    <ShieldCheck size={10} /> {user.role}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminUsers;

