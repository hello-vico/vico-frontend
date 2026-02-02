import React from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { Calendar, Utensils, TrendingUp, Clock, CheckCircle2, ChevronRight, Users } from 'lucide-react';
import { restaurantNavItems } from './navItems';

const RestaurantDashboard: React.FC = () => {

    return (
        <BaseLayout
            title="Ristorante Overview"
            navItems={restaurantNavItems}
            userRole="owner"
            userName="Luigi's Pasta"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Today's Bookings" value="12" icon={<Calendar className="text-emerald-600" />} trend="4 pending" />
                <StatCard title="Total Covers" value="48" icon={<Users className="text-blue-600" />} trend="+15% vs yesterday" />
                <StatCard title="Average Rating" value="4.8" icon={<Clock className="text-amber-600" />} trend="2 new reviews" />
                <StatCard title="Revenue (Today)" value="€1,240" icon={<TrendingUp className="text-purple-600" />} trend="+22% vs last Mon" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Reservations */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Prossime Prenotazioni</h2>
                            <p className="text-slate-500 text-sm mt-0.5">Le prossime prenotazioni in arrivo oggi.</p>
                        </div>
                        <button className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            Vedi tutte <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        <ReservationItem name="Mario Rossi" time="13:00" guests={4} status="confirmed" />
                        <ReservationItem name="Giulia Bianchi" time="13:30" guests={2} status="pending" />
                        <ReservationItem name="Luca Verdi" time="20:00" guests={6} status="confirmed" />
                        <ReservationItem name="Elena Neri" time="20:30" guests={4} status="confirmed" />
                    </div>
                </div>

                {/* Quick Actions / Stats */}
                <div className="space-y-8">
                    <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-2">Stato Servizio</h3>
                            <p className="text-emerald-100/80 text-sm mb-6">Il ristorante è attualmente aperto e accetta prenotazioni online.</p>
                            <div className="flex items-center gap-3">
                                <button className="bg-white text-emerald-600 px-4 py-2 rounded-xl font-bold text-sm">Pausa Pranzo</button>
                                <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-sm border border-emerald-400">Chiudi</button>
                            </div>
                        </div>
                        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Piatti Popolari</h3>
                        <div className="space-y-4">
                            <PopularDish name="Carbonara Special" orders={42} />
                            <PopularDish name="Tiramisù Artistico" orders={38} />
                            <PopularDish name="Lasagna Classica" orders={24} />
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ReactNode, trend: string }> = ({ title, value, icon, trend }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                {icon}
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                {trend}
            </span>
        </div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
);

const ReservationItem: React.FC<{ name: string, time: string, guests: number, status: 'confirmed' | 'pending' }> = ({ name, time, guests, status }) => (
    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                {name[0]}
            </div>
            <div>
                <h4 className="font-bold text-slate-900">{name}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                    <Clock size={12} /> {time} • {guests} persone
                </p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            {status === 'confirmed' ? (
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Confermato
                </span>
            ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-1">
                    <Clock size={10} /> In attesa
                </span>
            )}
        </div>
    </div>
);

const PopularDish: React.FC<{ name: string, orders: number }> = ({ name, orders }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Utensils size={14} />
            </div>
            <span className="text-sm font-medium text-slate-700">{name}</span>
        </div>
        <span className="text-xs font-bold text-slate-400">{orders} ordini</span>
    </div>
);

export default RestaurantDashboard;
