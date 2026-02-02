import React, { useMemo, useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import {
    Calendar,
    Filter,
    Download,
    Search,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { restaurantNavItems } from './navItems';

const weekdayShort = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

const Reservations: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const reservations = [
        { id: 1, name: 'Mario Rossi', guests: 4, time: '13:00', status: 'confirmed', table: 'T-04', phone: '+39 333 123 4567' },
        { id: 2, name: 'Giulia Bianchi', guests: 2, time: '13:30', status: 'pending', table: 'Unassigned', phone: '+39 345 987 6543' },
        { id: 3, name: 'Luca Verdi', guests: 6, time: '20:00', status: 'confirmed', table: 'T-12', phone: '+39 328 111 2222' },
        { id: 4, name: 'Elena Neri', guests: 4, time: '20:30', status: 'cancelled', table: '-', phone: '+39 331 444 5555' },
    ];

    const formattedSelectedDate = useMemo(
        () =>
            selectedDate.toLocaleDateString('it-IT', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        [selectedDate],
    );

    const daysStrip = useMemo(() => {
        const days: { label: string; date: Date; isToday: boolean; isSelected: boolean }[] = [];
        for (let offset = -3; offset <= 3; offset++) {
            const d = new Date(selectedDate);
            d.setDate(selectedDate.getDate() + offset);
            const isToday = d.toDateString() === new Date().toDateString();
            const isSelected = d.toDateString() === selectedDate.toDateString();
            const jsDay = d.getDay(); // 0 domenica, 1 lunedì, ...
            const idx = jsDay === 0 ? 6 : jsDay - 1;
            days.push({
                date: d,
                isToday,
                isSelected,
                label: `${weekdayShort[idx]} ${d.getDate()}`,
            });
        }
        return days;
    }, [selectedDate]);

    const changeDay = (delta: number) => {
        setSelectedDate((prev) => {
            const next = new Date(prev);
            next.setDate(prev.getDate() + delta);
            return next;
        });
    };

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        const [year, month, day] = e.target.value.split('-').map(Number);
        const newDate = new Date(year, (month || 1) - 1, day || 1);
        if (!isNaN(newDate.getTime())) {
            setSelectedDate(newDate);
            setShowDatePicker(false);
        }
    };

    const dateInputValue = useMemo(() => {
        const y = selectedDate.getFullYear();
        const m = `${selectedDate.getMonth() + 1}`.padStart(2, '0');
        const d = `${selectedDate.getDate()}`.padStart(2, '0');
        return `${y}-${m}-${d}`;
    }, [selectedDate]);

    return (
        <BaseLayout
            title="Gestione Prenotazioni"
            navItems={restaurantNavItems}
            userRole="owner"
            userName="Luigi's Pasta"
        >
            {/* Barra superiore con data, scorrimento veloce e azioni */}
            <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
                            Data prenotazioni
                        </span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => changeDay(-1)}
                                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                                aria-label="Giorno precedente"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex flex-col">
                                <span className="text-lg md:text-2xl font-black text-slate-900 leading-tight">
                                    {formattedSelectedDate}
                                </span>
                                <span className="text-xs font-medium text-slate-400">
                                    Scorri velocemente i giorni per cambiare data
                                </span>
                            </div>
                            <button
                                onClick={() => changeDay(1)}
                                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                                aria-label="Giorno successivo"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowDatePicker((v) => !v)}
                            className="relative flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm"
                        >
                            <Calendar size={18} />
                            <span>Cambia data</span>
                        </button>
                        <div className="hidden md:flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                <Filter size={18} /> Filtri
                            </button>
                            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                <Download size={18} /> Esporta
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mini calendario (semplice date input come popover) */}
                {showDatePicker && (
                    <div className="relative">
                        <div className="absolute z-20 mt-1 w-full max-w-xs bg-white border border-slate-200 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Seleziona una data
                                </span>
                                <button
                                    onClick={() => setShowDatePicker(false)}
                                    className="text-xs font-semibold text-slate-400 hover:text-slate-600"
                                >
                                    Chiudi
                                </button>
                            </div>
                            <input
                                type="date"
                                value={dateInputValue}
                                onChange={handleDateInputChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/60"
                            />
                            <p className="mt-2 text-[11px] text-slate-400">
                                In futuro questa data filtrerà le prenotazioni reali del tuo gestionale.
                            </p>
                        </div>
                    </div>
                )}

                {/* Striscia scorrevole dei giorni */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-3 py-3 overflow-x-auto no-scrollbar">
                    <div className="flex gap-2 min-w-max">
                        {daysStrip.map((day) => (
                            <button
                                key={day.date.toDateString()}
                                onClick={() => setSelectedDate(day.date)}
                                className={[
                                    'flex flex-col items-center justify-center px-3 py-2 rounded-2xl border text-xs font-semibold transition-all min-w-[64px]',
                                    day.isSelected
                                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                                        : day.isToday
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50',
                                ].join(' ')}
                            >
                                <span className="uppercase tracking-[0.12em]">
                                    {day.label.split(' ')[0]}
                                </span>
                                <span className="text-lg mt-1 leading-none">
                                    {day.date.getDate()}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Barra ricerca / azioni per mobile */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cerca per nome o telefono..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3 md:hidden">
                        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                            <Filter size={18} /> Filtri
                        </button>
                        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                            <Download size={18} /> Esporta
                        </button>
                    </div>
                </div>
            </div>

            {/* Prenotazioni a cards */}
            <div className="grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {reservations.map((res) => (
                    <div
                        key={res.id}
                        className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all p-5 flex flex-col gap-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg">
                                    {res.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                        {res.name}
                                    </p>
                                    <p className="text-xs text-slate-500">{res.phone}</p>
                                </div>
                            </div>
                            <button className="w-9 h-9 rounded-2xl hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Orario
                                </span>
                                <span className="text-lg font-semibold text-slate-900">
                                    {res.time}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Coperti
                                </span>
                                <span className="text-sm font-semibold text-slate-800">
                                    {res.guests} persone
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Tavolo
                                </span>
                                <span className="inline-flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-xl text-[11px] font-bold text-slate-600 border border-slate-200">
                                    {res.table}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <div>
                                {res.status === 'confirmed' && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                                        <CheckCircle2 size={10} /> Confermato
                                    </span>
                                )}
                                {res.status === 'pending' && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 inline-flex items-center gap-1">
                                        <Clock size={10} /> In attesa
                                    </span>
                                )}
                                {res.status === 'cancelled' && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100 inline-flex items-center gap-1">
                                        <XCircle size={10} /> Annullato
                                    </span>
                                )}
                            </div>
                            <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                                Dettagli
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </BaseLayout>
    );
};

export default Reservations;
