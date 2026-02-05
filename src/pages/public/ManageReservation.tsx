import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { getReservationByToken, updateReservationByToken, cancelReservationByToken } from '../../api/reservations';
import type { Prenotazione } from '../../types';

export default function ManageReservation() {
    const { token } = useParams<{ token: string }>();
    // TOKEN DI PROVA: abc123def456ghi789 - Usa questo per testare: /prenotazioni/gestisci/abc123def456ghi789
    const [reservation, setReservation] = useState<Prenotazione | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Edit form state
    const [formData, setFormData] = useState<Partial<Prenotazione>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (token) {
            fetchReservation(token);
        } else {
            setError('Token mancante');
            setLoading(false);
        }
    }, [token]);

    const fetchReservation = async (t: string) => {
        try {
            setLoading(true);
            const data = await getReservationByToken(t);
            setReservation(data);
            setFormData({
                numero_persone: data.numero_persone,
                note: data.note || '',
                // Ensure date format is compatible with input type="datetime-local" if needed, 
                // but usually API returns ISO string. 
                // For simplicity assuming data_ora is generic string/ISO.
                data_ora: data.data_ora
            });
        } catch (err) {
            console.error(err);
            setError('Impossibile recuperare la prenotazione. Il link potrebbe essere scaduto o non valido.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !reservation) return;

        try {
            setSaving(true);
            const updated = await updateReservationByToken(token, formData);
            setReservation(updated);
            setIsEditing(false);
            alert('Prenotazione aggiornata con successo! riceverai una nuova email di conferma');
        } catch (err) {
            console.error(err);
            alert('Errore durante l\'aggiornamento della prenotazione');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = async () => {
        if (!token || !confirm('Sei sicuro di voler cancellare questa prenotazione?')) return;

        try {
            setSaving(true);
            await cancelReservationByToken(token);
            // Refresh data or update local state
            setReservation(prev => prev ? { ...prev, stato: 'cancellata' } : null);
            alert('Prenotazione cancellata.');
        } catch (err) {
            console.error(err);
            alert('Errore durante la cancellazione');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center p-4">Caricamento...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center p-4 text-red-600">{error}</div>;
    if (!reservation) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Gestisci la tua prenotazione</div>
                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                        Ciao {reservation.nome_cliente}
                    </h1>

                    <div className="mt-6 border-t border-gray-100 pt-6">
                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Data e Ora</label>
                                    <input
                                        type="datetime-local"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                        value={formData.data_ora ? new Date(formData.data_ora).toISOString().slice(0, 16) : ''}
                                        onChange={e => setFormData({ ...formData, data_ora: new Date(e.target.value).toISOString() })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Numero Persone</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                        value={formData.numero_persone}
                                        onChange={e => setFormData({ ...formData, numero_persone: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Note</label>
                                    <textarea
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                        value={formData.note}
                                        onChange={e => setFormData({ ...formData, note: e.target.value })}
                                        rows={3}
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {saving ? 'Salvataggio...' : 'Salva Modifiche'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Stato:</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                        ${reservation.stato === 'confermata' ? 'bg-green-100 text-green-800' :
                                            reservation.stato === 'cancellata' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                        {reservation.stato.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Data:</span>
                                    <span className="font-medium text-gray-900">
                                        {reservation.data_ora && format(new Date(reservation.data_ora), 'PPP p', { locale: it })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Persone:</span>
                                    <span className="font-medium text-gray-900">{reservation.numero_persone}</span>
                                </div>
                                {reservation.note && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-500">Note:</span>
                                        <p className="text-gray-900 text-sm bg-gray-50 p-2 rounded">{reservation.note}</p>
                                    </div>
                                )}

                                {reservation.stato !== 'cancellata' && reservation.stato !== 'completata' && (
                                    <div className="flex flex-col gap-3 pt-6">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Modifica Prenotazione
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="w-full justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Cancella Prenotazione
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
