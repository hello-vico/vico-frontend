import React, { useState } from 'react';
import type { CreateRistoranteDto } from '../../types';

interface RistoranteFormProps {
    initialValues?: Partial<CreateRistoranteDto>;
    onSubmit: (values: CreateRistoranteDto) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

const defaultValues: CreateRistoranteDto = {
    nome: '',
    indirizzo: '',
    telefono: '',
    p_iva: '',
    slot_prenotazione: 60,
};

export const RistoranteForm: React.FC<RistoranteFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
    isSubmitting,
}) => {
    const [values, setValues] = useState<CreateRistoranteDto>({
        ...defaultValues,
        ...initialValues,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: name === 'slot_prenotazione' ? Number(value) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome ristorante</label>
                    <input
                        type="text"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                        placeholder="Es. Trattoria da Mario"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefono</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={values.telefono}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                        placeholder="+39 ..."
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Indirizzo</label>
                <input
                    type="text"
                    name="indirizzo"
                    value={values.indirizzo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    placeholder="Via Roma 10, Milano"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Partita IVA</label>
                    <input
                        type="text"
                        name="p_iva"
                        value={values.p_iva}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                        placeholder="IT00000000000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Slot prenotazione (minuti)</label>
                    <input
                        type="number"
                        name="slot_prenotazione"
                        value={values.slot_prenotazione}
                        onChange={handleChange}
                        min={15}
                        step={15}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
                    disabled={isSubmitting}
                >
                    Annulla
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Salvataggio...' : 'Salva ristorante'}
                </button>
            </div>
        </form>
    );
};

