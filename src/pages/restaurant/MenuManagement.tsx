import React from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { Utensils, Plus, Tag, LayoutGrid, List } from 'lucide-react';

const MenuManagement: React.FC = () => {
    const navItems = [
        { label: 'Dashboard', icon: <Utensils size={20} />, path: '/restaurant/dashboard' },
        { label: 'Prenotazioni', icon: <Utensils size={20} />, path: '/restaurant/reservations' },
        { label: 'Menu', icon: <Utensils size={20} />, path: '/restaurant/menu' },
    ];

    const categories = [
        { id: 1, name: 'Primi piatti', count: 12 },
        { id: 2, name: 'Secondi piatti', count: 8 },
        { id: 3, name: 'Dessert', count: 5 },
        { id: 4, name: 'Bevande', count: 20 },
    ];

    return (
        <BaseLayout
            title="Gestione Menu"
            navItems={navItems}
            userRole="owner"
            userName="Luigi's Pasta"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Il tuo Menu Digitale</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Aggiungi, modifica o rimuovi piatti dal tuo menu.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-1 rounded-xl flex items-center mr-2">
                        <button className="p-2 bg-white rounded-lg shadow-sm text-emerald-600"><LayoutGrid size={18} /></button>
                        <button className="p-2 text-slate-400"><List size={18} /></button>
                    </div>
                    <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200">
                        <Plus size={20} /> Nuovo Piatto
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                {categories.map(cat => (
                    <button key={cat.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/10 transition-all text-left group">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                            <Tag size={20} className="text-slate-400 group-hover:text-emerald-600" />
                        </div>
                        <h3 className="font-bold text-slate-900">{cat.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{cat.count} piatti registrati</p>
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-10 text-center py-32 border-dashed">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Utensils size={48} className="text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Seleziona una categoria</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Scegli una categoria a sinistra per visualizzare i piatti o inizia aggiungendo un nuovo piatto al tuo menu.</p>
                <button className="mt-8 text-emerald-600 font-bold hover:underline">Guida alla gestione menu</button>
            </div>
        </BaseLayout>
    );
};

export default MenuManagement;
