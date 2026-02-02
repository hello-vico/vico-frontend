import React, { useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { restaurantNavItems } from './navItems';
import { Bell, FileText, Globe, Lock, MapPin, Phone, Save, Shield, Utensils, CalendarClock, Upload, Trash2 } from 'lucide-react';

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

interface ShiftHours {
    from: string;
    to: string;
}

interface DaySchedule {
    open: boolean;
    lunch: ShiftHours;
    dinner: ShiftHours;
}

const defaultSchedule: Record<DayKey, DaySchedule> = {
    mon: { open: true, lunch: { from: '12:00', to: '15:00' }, dinner: { from: '19:00', to: '23:00' } },
    tue: { open: true, lunch: { from: '12:00', to: '15:00' }, dinner: { from: '19:00', to: '23:00' } },
    wed: { open: true, lunch: { from: '12:00', to: '15:00' }, dinner: { from: '19:00', to: '23:00' } },
    thu: { open: true, lunch: { from: '12:00', to: '15:00' }, dinner: { from: '19:00', to: '23:00' } },
    fri: { open: true, lunch: { from: '12:00', to: '15:00' }, dinner: { from: '19:00', to: '23:00' } },
    sat: { open: true, lunch: { from: '12:00', to: '15:00' }, dinner: { from: '19:00', to: '23:00' } },
    sun: { open: false, lunch: { from: '12:00', to: '15:00' }, dinner: { from: '19:00', to: '23:00' } },
};

const dayLabels: { key: DayKey; label: string }[] = [
    { key: 'mon', label: 'Lunedì' },
    { key: 'tue', label: 'Martedì' },
    { key: 'wed', label: 'Mercoledì' },
    { key: 'thu', label: 'Giovedì' },
    { key: 'fri', label: 'Venerdì' },
    { key: 'sat', label: 'Sabato' },
    { key: 'sun', label: 'Domenica' },
];

const RestaurantSettings: React.FC = () => {
    const [schedule, setSchedule] = useState<Record<DayKey, DaySchedule>>(defaultSchedule);

    const handleToggleOpen = (day: DayKey, open: boolean) => {
        setSchedule((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                open,
            },
        }));
    };

    const handleChangeShift = (
        day: DayKey,
        shift: 'lunch' | 'dinner',
        field: 'from' | 'to',
        value: string
    ) => {
        setSchedule((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [shift]: {
                    ...prev[day][shift],
                    [field]: value,
                },
            },
        }));
    };

    const copyMondayToWeekdays = () => {
        setSchedule((prev) => {
            const base = prev.mon;
            return {
                ...prev,
                tue: { ...base },
                wed: { ...base },
                thu: { ...base },
                fri: { ...base },
            };
        });
    };

    const copyMondayToAll = () => {
        setSchedule((prev) => {
            const base = prev.mon;
            return {
                mon: { ...base },
                tue: { ...base },
                wed: { ...base },
                thu: { ...base },
                fri: { ...base },
                sat: { ...base },
                sun: { ...base },
            };
        });
    };

    return (
        <BaseLayout
            title="Impostazioni Ristorante"
            navItems={restaurantNavItems}
            userRole="owner"
            userName="Luigi's Pasta"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Colonna sinistra: info + orari */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Info di base */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-6">
                        <div className="flex items-center justify-between gap-4 mb-2">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Utensils size={18} className="text-emerald-600" />
                                    Dati ristorante
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Informazioni visibili ai clienti sulle pagine di prenotazione.
                                </p>
                            </div>
                            <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 text-white text-sm font-semibold px-4 py-2 hover:bg-emerald-500 shadow-sm">
                                <Save size={16} />
                                Salva modifiche
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nome ristorante</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="Luigi's Pasta"
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm"
                                        disabled
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">
                                        Bloccato
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Telefono</label>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 flex-1">
                                        <Phone size={16} className="mr-2 text-slate-400" />
                                        <span>+39 333 123 4567</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Indirizzo</label>
                                <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600">
                                    <MapPin size={16} className="mr-2 text-slate-400" />
                                    <span>Via Roma 10, Milano (MI)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orari di apertura */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-5">
                        <div className="flex items-center justify-between gap-4 mb-1">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <CalendarClock size={18} className="text-emerald-600" />
                                    Orari di apertura
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Definisci gli orari in cui accetti prenotazioni per ogni giorno della settimana.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
                            <span className="font-semibold text-slate-500 uppercase tracking-wide">
                                Azioni rapide orari
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={copyMondayToWeekdays}
                                    className="px-3 py-1.5 rounded-2xl border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                                >
                                    Copia Lunedì su Lun–Ven
                                </button>
                                <button
                                    type="button"
                                    onClick={copyMondayToAll}
                                    className="px-3 py-1.5 rounded-2xl border border-emerald-200 bg-emerald-50 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100"
                                >
                                    Copia Lunedì su tutti i giorni
                                </button>
                            </div>
                        </div>

                        <div className="border border-slate-100 rounded-2xl overflow-hidden">
                            {dayLabels.map((day, idx) => (
                                <div
                                    key={day.key}
                                    className={`flex flex-col gap-3 px-4 md:px-6 py-3 text-sm ${
                                        idx !== 6 ? 'border-b border-slate-50' : ''
                                    } bg-white`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1 font-medium text-slate-800">{day.label}</div>
                                        <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                                            <input
                                                type="checkbox"
                                                checked={schedule[day.key].open}
                                                onChange={(e) => handleToggleOpen(day.key, e.target.checked)}
                                                className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                                            />
                                            Aperto
                                        </label>
                                    </div>

                                    <div
                                        className={`grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 md:pl-6 text-xs text-slate-600 ${
                                            !schedule[day.key].open ? 'opacity-60' : ''
                                        }`}
                                    >
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-semibold text-slate-700">Pranzo</span>
                                            <span className="hidden md:inline text-slate-400">dalle</span>
                                            <input
                                                type="time"
                                                value={schedule[day.key].lunch.from}
                                                onChange={(e) =>
                                                    handleChangeShift(day.key, 'lunch', 'from', e.target.value)
                                                }
                                                className="rounded-xl border border-slate-200 px-2 py-1 text-xs"
                                                disabled={!schedule[day.key].open}
                                            />
                                            <span className="hidden md:inline text-slate-400">alle</span>
                                            <input
                                                type="time"
                                                value={schedule[day.key].lunch.to}
                                                onChange={(e) =>
                                                    handleChangeShift(day.key, 'lunch', 'to', e.target.value)
                                                }
                                                className="rounded-xl border border-slate-200 px-2 py-1 text-xs"
                                                disabled={!schedule[day.key].open}
                                            />
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-semibold text-slate-700">Cena</span>
                                            <span className="hidden md:inline text-slate-400">dalle</span>
                                            <input
                                                type="time"
                                                value={schedule[day.key].dinner.from}
                                                onChange={(e) =>
                                                    handleChangeShift(day.key, 'dinner', 'from', e.target.value)
                                                }
                                                className="rounded-xl border border-slate-200 px-2 py-1 text-xs"
                                                disabled={!schedule[day.key].open}
                                            />
                                            <span className="hidden md:inline text-slate-400">alle</span>
                                            <input
                                                type="time"
                                                value={schedule[day.key].dinner.to}
                                                onChange={(e) =>
                                                    handleChangeShift(day.key, 'dinner', 'to', e.target.value)
                                                }
                                                className="rounded-xl border border-slate-200 px-2 py-1 text-xs"
                                                disabled={!schedule[day.key].open}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500">
                            Nota: questa è una configurazione grafica. In una fase successiva potrai collegarla all&apos;API
                            del tuo gestionale.
                        </p>
                    </div>
                </div>

                {/* Colonna destra: stato prenotazioni, notifiche, sicurezza, menu PDF */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Globe size={16} className="text-emerald-600" />
                            Prenotazioni online
                        </h3>
                        <p className="text-xs text-slate-500">
                            Controlla se i clienti possono prenotare online e come gestire la disponibilità.
                        </p>

                        <div className="flex items-center justify-between mt-2">
                            <div>
                                <p className="text-sm font-medium text-slate-800">Accetta prenotazioni online</p>
                                <p className="text-xs text-slate-500">Mostra il tuo ristorante come &quot;Disponibile&quot; su VICO.</p>
                            </div>
                            <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-emerald-500 transition-colors">
                                <span className="inline-block h-5 w-5 translate-x-6 rounded-full bg-white shadow-sm transition-transform" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-800">Tempo slot prenotazione</p>
                                <p className="text-xs text-slate-500">Determina la durata media di un servizio al tavolo.</p>
                            </div>
                            <select className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800">
                                <option>45 minuti</option>
                                <option>60 minuti</option>
                                <option>90 minuti</option>
                                <option>120 minuti</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Bell size={16} className="text-emerald-600" />
                            Notifiche
                        </h3>
                        <p className="text-xs text-slate-500">
                            Scegli come essere avvisato quando arrivano nuove prenotazioni o modifiche.
                        </p>

                        <div className="space-y-3 mt-1">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600" />
                                <div>
                                    <p className="text-sm font-medium text-slate-800">Email per ogni nuova prenotazione</p>
                                    <p className="text-xs text-slate-500">Riceverai una mail di conferma con tutti i dettagli.</p>
                                </div>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600" />
                                <div>
                                    <p className="text-sm font-medium text-slate-800">Riepilogo giornaliero</p>
                                    <p className="text-xs text-slate-500">Ogni mattina una panoramica delle prenotazioni del giorno.</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Lock size={16} className="text-emerald-600" />
                            Sicurezza & accessi
                        </h3>
                        <p className="text-xs text-slate-500">
                            Gestisci chi può accedere al pannello del ristorante.
                        </p>
                        <div className="flex items-center justify-between mt-1">
                            <div>
                                <p className="text-sm font-medium text-slate-800">Codice di sicurezza</p>
                                <p className="text-xs text-slate-500">Richiedi un secondo fattore per l&apos;accesso all&apos;account.</p>
                            </div>
                            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                <Shield size={14} />
                                Configura
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <FileText size={16} className="text-emerald-600" />
                            Menu in PDF
                        </h3>
                        <p className="text-xs text-slate-500">
                            Carica uno o più file PDF con il tuo menu aggiornato. I clienti potranno scaricarli dalla pagina
                            del ristorante.
                        </p>

                        <div className="space-y-3 mt-2">
                            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                                <div className="flex items-center gap-2">
                                    <FileText size={14} className="text-slate-400" />
                                    <span>Menu-pranzo-2025.pdf</span>
                                </div>
                                <button className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-[10px] font-semibold text-slate-500 hover:bg-slate-100">
                                    <Trash2 size={10} />
                                    Rimuovi
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/40 px-3 py-2 text-xs font-semibold text-emerald-700 cursor-pointer hover:bg-emerald-50">
                                <Upload size={14} />
                                <span>Carica nuovo PDF</span>
                                <input type="file" accept="application/pdf" className="hidden" />
                            </label>
                            <p className="mt-1 text-[10px] text-slate-400">
                                Solo file PDF, max 10MB. L&apos;upload reale verrà collegato all&apos;API in fase successiva.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default RestaurantSettings;

