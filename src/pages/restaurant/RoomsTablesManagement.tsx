import React, { useMemo, useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { restaurantNavItems } from './navItems';
import { LayoutGrid, Plus, Users, Edit2, Trash2 } from 'lucide-react';

type Table = {
    id: number;
    name: string;
    seats: number;
    status: 'available' | 'occupied' | 'reserved';
};

type Room = {
    id: number;
    name: string;
    description: string;
    capacity: number;
    tables: Table[];
};

const mockRooms: Room[] = [
    {
        id: 1,
        name: 'Sala Principale',
        description: 'Sala luminosa all’ingresso, ideale per il servizio quotidiano.',
        capacity: 40,
        tables: [
            { id: 1, name: 'T-01', seats: 2, status: 'available' },
            { id: 2, name: 'T-02', seats: 4, status: 'reserved' },
            { id: 3, name: 'T-03', seats: 4, status: 'occupied' },
            { id: 4, name: 'T-04', seats: 6, status: 'available' },
        ],
    },
    {
        id: 2,
        name: 'Sala Interna',
        description: 'Spazio più tranquillo, ideale per piccoli gruppi e famiglie.',
        capacity: 24,
        tables: [
            { id: 5, name: 'T-10', seats: 4, status: 'available' },
            { id: 6, name: 'T-11', seats: 2, status: 'available' },
            { id: 7, name: 'T-12', seats: 6, status: 'reserved' },
        ],
    },
    {
        id: 3,
        name: 'Dehors',
        description: 'Tavoli esterni per la stagione primaverile ed estiva.',
        capacity: 18,
        tables: [
            { id: 8, name: 'D-01', seats: 2, status: 'available' },
            { id: 9, name: 'D-02', seats: 4, status: 'available' },
            { id: 10, name: 'D-03', seats: 4, status: 'occupied' },
        ],
    },
];

type TableFormMode = 'create' | 'edit';

const emptyTableForm: { id?: number; name: string; seats: number; status: Table['status'] } = {
    name: '',
    seats: 2,
    status: 'available',
};

const RoomsTablesManagement: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>(mockRooms);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(mockRooms[0]?.id ?? null);
    const [tableFormMode, setTableFormMode] = useState<TableFormMode>('create');
    const [tableFormRoomId, setTableFormRoomId] = useState<number | null>(null);
    const [tableForm, setTableForm] = useState<typeof emptyTableForm>(emptyTableForm);
    const [showTableDrawer, setShowTableDrawer] = useState(false);

    const selectedRoom = useMemo(
        () => rooms.find((r) => r.id === selectedRoomId) ?? rooms[0] ?? null,
        [rooms, selectedRoomId]
    );

    const openCreateTable = (roomId: number) => {
        setTableFormMode('create');
        setTableFormRoomId(roomId);
        setTableForm({ ...emptyTableForm, name: `T-${String(Date.now()).slice(-2)}` });
        setShowTableDrawer(true);
    };

    const openEditTable = (roomId: number, table: Table) => {
        setTableFormMode('edit');
        setTableFormRoomId(roomId);
        setTableForm({
            id: table.id,
            name: table.name,
            seats: table.seats,
            status: table.status,
        });
        setShowTableDrawer(true);
    };

    const handleChangeTableField = (field: 'name' | 'seats' | 'status', value: string | number) => {
        setTableForm((prev) => ({
            ...prev,
            [field]: field === 'seats' ? Number(value) || 0 : value,
        }));
    };

    const handleSaveTable = () => {
        if (!tableFormRoomId || !tableForm.name.trim() || tableForm.seats <= 0) {
            return;
        }

        setRooms((prevRooms) =>
            prevRooms.map((room) => {
                if (room.id !== tableFormRoomId) return room;

                if (tableFormMode === 'create') {
                    const nextId =
                        prevRooms
                            .flatMap((r) => r.tables)
                            .reduce((max, t) => (t.id > max ? t.id : max), 0) + 1;

                    const newTable: Table = {
                        id: nextId,
                        name: tableForm.name.trim(),
                        seats: tableForm.seats,
                        status: tableForm.status,
                    };

                    return {
                        ...room,
                        tables: [...room.tables, newTable],
                    };
                }

                // edit
                return {
                    ...room,
                    tables: room.tables.map((t) =>
                        t.id === tableForm.id
                            ? {
                                ...t,
                                name: tableForm.name.trim(),
                                seats: tableForm.seats,
                                status: tableForm.status,
                            }
                            : t
                    ),
                };
            })
        );

        setShowTableDrawer(false);
        setTableForm(emptyTableForm);
        setTableFormRoomId(null);
    };

    const handleCancelTableEdit = () => {
        setShowTableDrawer(false);
        setTableForm(emptyTableForm);
        setTableFormRoomId(null);
    };

    return (
        <BaseLayout
            title="Sale e Tavoli"
            navItems={restaurantNavItems}
            userRole="owner"
            userName="Luigi's Pasta"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <LayoutGrid size={20} className="text-emerald-600" />
                        Configurazione sale e tavoli
                    </h2>
                    <p className="text-slate-500 text-sm mt-0.5">
                        Organizza gli spazi del ristorante e assegna i tavoli per gestire meglio le prenotazioni.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200">
                        <Plus size={18} />
                        Nuova sala
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 transition-all">
                        <Plus size={16} />
                        Nuovo tavolo veloce
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Tabs sale */}
                    <div className="flex flex-wrap gap-2 mb-1">
                        {rooms.map((room) => (
                            <button
                                key={room.id}
                                type="button"
                                onClick={() => setSelectedRoomId(room.id)}
                                className={`px-4 py-2 rounded-2xl text-xs font-semibold border transition-all ${selectedRoom && selectedRoom.id === room.id
                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {room.name}
                            </button>
                        ))}
                    </div>

                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:border-emerald-200 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{room.name}</h3>
                                    <p className="text-xs text-slate-500 mt-1 max-w-md">{room.description}</p>
                                    <p className="text-xs font-semibold text-slate-500 mt-2">
                                        Capacità stimata:{' '}
                                        <span className="text-slate-900">
                                            {room.capacity} coperti
                                        </span>
                                        {' '}• Tavoli configurati:{' '}
                                        <span className="text-slate-900">
                                            {room.tables.length}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                        <Edit2 size={14} />
                                        Modifica sala
                                    </button>
                                    <button className="inline-flex items-center gap-1 rounded-xl border border-red-100 bg-red-50/60 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                                        <Trash2 size={14} />
                                        Rimuovi
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                                {room.tables.map((table) => (
                                    <button
                                        key={table.id}
                                        type="button"
                                        onClick={() => openEditTable(room.id, table)}
                                        className="group bg-slate-50 rounded-2xl border border-slate-100 px-4 py-3 flex flex-col items-start gap-1 text-left hover:bg-emerald-50/60 hover:border-emerald-200 transition-all"
                                    >
                                        <div className="flex items-center justify-between w-full gap-2">
                                            <span className="text-sm font-bold text-slate-900">{table.name}</span>
                                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                                                <Users size={12} className="text-slate-400 group-hover:text-emerald-600" />
                                                {table.seats}
                                            </span>
                                        </div>
                                        <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide
                                            ${table.status === 'available'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                : table.status === 'reserved'
                                                    ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                                    : 'bg-red-50 text-red-700 border border-red-100'
                                            }
                                        `}>
                                            {table.status === 'available' && 'Libero'}
                                            {table.status === 'reserved' && 'Riservato'}
                                            {table.status === 'occupied' && 'Occupato'}
                                        </span>
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => openCreateTable(room.id)}
                                    className="border border-dashed border-slate-200 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-500 hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-700 flex items-center justify-center gap-2 transition-all"
                                >
                                    <Plus size={14} />
                                    Aggiungi tavolo
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    {/* Pannello laterale: form tavolo */}
                    {showTableDrawer && (
                        <div className="bg-white rounded-3xl border border-emerald-200 shadow-lg p-6 space-y-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">
                                        {tableFormMode === 'create' ? 'Nuovo tavolo' : 'Modifica tavolo'}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {tableFormMode === 'create'
                                            ? 'Definisci un nuovo tavolo per la sala selezionata.'
                                            : 'Aggiorna le informazioni del tavolo selezionato.'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Nome tavolo
                                    </label>
                                    <input
                                        type="text"
                                        value={tableForm.name}
                                        onChange={(e) => handleChangeTableField('name', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                                        placeholder="Es. T-05"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Numero posti
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={tableForm.seats}
                                        onChange={(e) => handleChangeTableField('seats', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Stato iniziale
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleChangeTableField('status', 'available')}
                                            className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold border ${tableForm.status === 'available'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                                    : 'bg-white text-slate-600 border-slate-200'
                                                }`}
                                        >
                                            Libero
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleChangeTableField('status', 'reserved')}
                                            className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold border ${tableForm.status === 'reserved'
                                                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                                                    : 'bg-white text-slate-600 border-slate-200'
                                                }`}
                                        >
                                            Riservato
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleChangeTableField('status', 'occupied')}
                                            className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold border ${tableForm.status === 'occupied'
                                                    ? 'bg-red-50 text-red-700 border-red-300'
                                                    : 'bg-white text-slate-600 border-slate-200'
                                                }`}
                                        >
                                            Occupato
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={handleCancelTableEdit}
                                    className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveTable}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 shadow-sm"
                                >
                                    Salva tavolo
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-900 mb-3">
                            Linee guida configurazione
                        </h3>
                        <ul className="space-y-2 text-xs text-slate-600">
                            <li>• Usa sale diverse per separare zone interne, esterne o private.</li>
                            <li>• Imposta il numero di posti per tavolo in modo realistico.</li>
                            <li>• Tavoli con meno posti sono ideali per coppie o ospiti singoli.</li>
                            <li>• Tavoli grandi possono essere marcati come combinabili per eventi.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </BaseLayout>
    );
};

export default RoomsTablesManagement;

