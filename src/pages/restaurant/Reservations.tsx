import React, { useMemo, useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import {
    Calendar,
    Search,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronLeft,
    ChevronRight,
    Plus,
} from 'lucide-react';
import { restaurantNavItems } from './navItems';

const weekdayShort = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

type Reservation = {
    id: number;
    name: string;
    guests: number;
    time: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    table: string;
    phone: string;
    date: Date;
    notes?: string;
};

type ReservationForm = {
    name: string;
    guests: number;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    table: string;
    phone: string;
    notes: string;
};

const emptyReservationForm: ReservationForm = {
    name: '',
    guests: 2,
    time: '19:00',
    status: 'pending',
    table: '',
    phone: '',
    notes: '',
};

const Reservations: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
    const [showNewReservationModal, setShowNewReservationModal] = useState(false);
    const [reservationForm, setReservationForm] = useState(emptyReservationForm);

    const [reservations, setReservations] = useState<Reservation[]>([
        { id: 1, name: 'Mario Rossi', guests: 4, time: '13:00', status: 'confirmed', table: 'T-04', phone: '+39 333 123 4567', date: new Date() },
        { id: 2, name: 'Giulia Bianchi', guests: 2, time: '13:30', status: 'pending', table: 'Unassigned', phone: '+39 345 987 6543', date: new Date() },
        { id: 3, name: 'Luca Verdi', guests: 6, time: '20:00', status: 'confirmed', table: 'T-12', phone: '+39 328 111 2222', date: new Date() },
        { id: 4, name: 'Elena Neri', guests: 4, time: '20:30', status: 'cancelled', table: '-', phone: '+39 331 444 5555', date: new Date() },
    ]);

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

    const handleReservationFieldChange = (field: keyof ReservationForm, value: string | number) => {
        setReservationForm((prev) => ({
            ...prev,
            [field]: field === 'guests' ? Number(value) || 1 : value,
        }));
    };

    const handleSaveReservation = () => {
        if (!reservationForm.name.trim() || !reservationForm.phone.trim()) {
            return;
        }

        const newReservation: Reservation = {
            id: Math.max(...reservations.map(r => r.id), 0) + 1,
            name: reservationForm.name.trim(),
            guests: reservationForm.guests,
            time: reservationForm.time,
            status: reservationForm.status,
            table: reservationForm.table.trim() || 'Unassigned',
            phone: reservationForm.phone.trim(),
            date: selectedDate,
            notes: reservationForm.notes.trim(),
        };

        setReservations((prev) => [...prev, newReservation]);
        setReservationForm(emptyReservationForm);
        setShowNewReservationModal(false);
    };

    const handleCancelReservation = () => {
        setReservationForm(emptyReservationForm);
        setShowNewReservationModal(false);
    };



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
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => changeDay(-1)}
                                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-[#6366F1] transition-colors"
                                aria-label="Giorno precedente"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex flex-col">
                                <span className="text-lg md:text-2xl font-black text-slate-900 leading-tight">
                                    {formattedSelectedDate}
                                </span>
                            </div>
                            <button
                                onClick={() => changeDay(1)}
                                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-[#6366F1] transition-colors"
                                aria-label="Giorno successivo"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 min-w-max">
                        {daysStrip.map((day) => (
                            <button
                                key={day.date.toDateString()}
                                onClick={() => setSelectedDate(day.date)}
                                className={[
                                    'flex flex-col items-center justify-center px-3 py-2 rounded-2xl border text-xs font-semibold transition-all min-w-[64px]',
                                    day.isSelected
                                        ? 'bg-[#6366F1] text-white border-[#6366F1] shadow-sm'
                                        : day.isToday
                                            ? 'bg-indigo-50 text-[#6366F1] border-indigo-100'
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

                {/* Calendario Popup */}
                {showDatePicker && (
                    <div className="relative">
                        <div className="absolute right-0 z-20 mt-1 w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-slate-900 capitalize">
                                    {calendarMonth.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setCalendarMonth(prev => {
                                            const newMonth = new Date(prev);
                                            newMonth.setMonth(prev.getMonth() - 1);
                                            return newMonth;
                                        })}
                                        className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={() => setCalendarMonth(prev => {
                                            const newMonth = new Date(prev);
                                            newMonth.setMonth(prev.getMonth() + 1);
                                            return newMonth;
                                        })}
                                        className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                    <button
                                        onClick={() => setShowDatePicker(false)}
                                        className="ml-2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1"
                                    >
                                        Chiudi
                                    </button>
                                </div>
                            </div>

                            {/* Giorni della settimana */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
                                    <div key={day} className="text-center text-[11px] font-semibold text-slate-400 py-1">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Griglia del calendario */}
                            <div className="grid grid-cols-7 gap-1">
                                {(() => {
                                    const year = calendarMonth.getFullYear();
                                    const month = calendarMonth.getMonth();
                                    const firstDay = new Date(year, month, 1);
                                    const lastDay = new Date(year, month + 1, 0);
                                    const startOffset = firstDay.getDay();
                                    const daysInMonth = lastDay.getDate();
                                    const days = [];

                                    // Celle vuote prima del primo giorno
                                    for (let i = 0; i < startOffset; i++) {
                                        days.push(<div key={`empty-${i}`} className="h-9" />);
                                    }

                                    // Giorni del mese
                                    for (let day = 1; day <= daysInMonth; day++) {
                                        const date = new Date(year, month, day);
                                        const isSelected = date.toDateString() === selectedDate.toDateString();
                                        const isToday = date.toDateString() === new Date().toDateString();

                                        days.push(
                                            <button
                                                key={day}
                                                onClick={() => {
                                                    setSelectedDate(date);
                                                    setShowDatePicker(false);
                                                }}
                                                className={[
                                                    'h-9 w-9 rounded-xl text-sm font-medium transition-all flex items-center justify-center',
                                                    isSelected
                                                        ? 'bg-[#6366F1] text-white shadow-md'
                                                        : isToday
                                                            ? 'bg-indigo-50 text-[#6366F1] font-bold border border-indigo-200'
                                                            : 'text-slate-700 hover:bg-slate-100'
                                                ].join(' ')}
                                            >
                                                {day}
                                            </button>
                                        );
                                    }

                                    return days;
                                })()}
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        const today = new Date();
                                        setSelectedDate(today);
                                        setCalendarMonth(today);
                                        setShowDatePicker(false);
                                    }}
                                    className="text-xs font-semibold text-[#6366F1] hover:text-indigo-700"
                                >
                                    Oggi
                                </button>
                                <p className="text-[11px] text-slate-400">
                                    Seleziona una data per filtrare
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Nuova Prenotazione */}
                {showNewReservationModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6 md:p-8 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900">Nuova Prenotazione</h3>
                                    <button
                                        onClick={handleCancelReservation}
                                        className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
                                    >
                                        <XCircle size={20} />
                                    </button>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">
                                    Data: {selectedDate.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </p>
                            </div>
                            
                            <div className="p-6 md:p-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Colonna sinistra */}
                                    <div className="space-y-6">
                                        {/* Nome */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                Nome cliente *
                                            </label>
                                            <input
                                                type="text"
                                                value={reservationForm.name}
                                                onChange={(e) => handleReservationFieldChange('name', e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-[#6366F1]"
                                                placeholder="Es. Mario Rossi"
                                            />
                                        </div>
                                        
                                        {/* Telefono */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                Telefono *
                                            </label>
                                            <input
                                                type="tel"
                                                value={reservationForm.phone}
                                                onChange={(e) => handleReservationFieldChange('phone', e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-[#6366F1]"
                                                placeholder="Es. +39 333 123 4567"
                                            />
                                        </div>
                                        
                                        {/* Orario e Coperti */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                    Orario
                                                </label>
                                                <input
                                                    type="time"
                                                    value={reservationForm.time}
                                                    onChange={(e) => handleReservationFieldChange('time', e.target.value)}
                                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-[#6366F1]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                    Coperti
                                                </label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={20}
                                                    value={reservationForm.guests}
                                                    onChange={(e) => handleReservationFieldChange('guests', e.target.value)}
                                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-[#6366F1]"
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Tavolo */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                Tavolo
                                            </label>
                                            <input
                                                type="text"
                                                value={reservationForm.table}
                                                onChange={(e) => handleReservationFieldChange('table', e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-[#6366F1]"
                                                placeholder="Es. T-05 (opzionale)"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Colonna destra */}
                                    <div className="space-y-6">
                                        {/* Stato */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                Stato
                                            </label>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleReservationFieldChange('status', 'pending')}
                                                    className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                                                        reservationForm.status === 'pending'
                                                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                                                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    In attesa
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleReservationFieldChange('status', 'confirmed')}
                                                    className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                                                        reservationForm.status === 'confirmed'
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    Confermato
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleReservationFieldChange('status', 'cancelled')}
                                                    className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                                                        reservationForm.status === 'cancelled'
                                                            ? 'bg-red-50 text-red-700 border-red-300'
                                                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    Annullato
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Note */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                                Note
                                            </label>
                                            <textarea
                                                rows={8}
                                                value={reservationForm.notes}
                                                onChange={(e) => handleReservationFieldChange('notes', e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-[#6366F1] resize-none"
                                                placeholder="Allergie, occasioni speciali, richieste particolari..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                                <button
                                    onClick={handleCancelReservation}
                                    className="text-sm font-semibold text-slate-500 hover:text-slate-700 px-4 py-2"
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleSaveReservation}
                                    disabled={!reservationForm.name.trim() || !reservationForm.phone.trim()}
                                    className="flex items-center gap-2 bg-[#6366F1] text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                >
                                    <Plus size={18} />
                                    Crea prenotazione
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Barra ricerca / azioni per mobile */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cerca per nome o telefono..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#6366F1]/50 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3" >
                        <button title="Cambia data"
                            onClick={() => setShowDatePicker((v) => !v)}
                            className="relative flex items-center gap-2 bg-white px-4 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <Calendar size={18} />
                        </button>
                        <div className="hidden md:flex items-center gap-3" >
                            <button title="Aggiungi prenotazione"
                                onClick={() => setShowNewReservationModal(true)}
                                className="flex items-center gap-2 bg-brand-primary text-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:opacity-80 transition-all">
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prenotazioni a cards */}
            <div className="grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {reservations.map((res) => (
                    <div
                        key={res.id}
                        className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md  transition-all p-5 flex flex-col gap-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg">
                                    {res.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 group-hover:text-[#6366F1] transition-colors">
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
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6366F1] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 inline-flex items-center gap-1">
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
                            <button className="text-xs font-semibold text-[#6366F1] hover:text-indigo-800">
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
