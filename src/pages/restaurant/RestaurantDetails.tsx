import React, { useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { restaurantNavItems } from './navItems';
import {
    Save,
    Accessibility,
    UtensilsCrossed,
    Wifi,
    Armchair,
    CreditCard,
    ScrollText,
    Info,
    Languages,
    Users,
    Clock,
    Baby,
    Cake,
    Tv
} from 'lucide-react';

interface VenueDetails {
    description: string;
    hospitality: {
        languages: string[];
        customLanguages: string;
        groupsAllowed: boolean;
        maxGroupSize: number;
    };
    kitchenHours: {
        lunch: { from: string; to: string };
        dinner: { from: string; to: string };
    };
    accessibility: {
        wheelchairAccess: boolean;
        accessibleRestroom: boolean;
        elevator: boolean;
        parking: boolean;
        ztl: boolean;
    };
    dietary: {
        vegan: boolean;
        vegetarian: boolean;
        glutenFree: boolean;
        lactoseFree: boolean;
        organic: boolean;
        kidsMenu: boolean;
        halal: boolean;
        kosher: boolean;
    };
    amenities: {
        wifi: boolean;
        airConditioning: boolean;
        outdoorSeating: boolean;
        privateRoom: boolean;
        privateRoomCapacity: { min: number; max: number };
        kidsArea: boolean;
        petsAllowed: boolean;
        changingTable: boolean;
        highChairs: 'none' | 'limited' | 'available';
        sports: {
            available: boolean;
            hasTv: boolean;
            hasSky: boolean;
            hasDazn: boolean;
        };
    };
    atmosphere: string[];
    paymentMethods: {
        creditCards: boolean;
        cash: boolean;
        digital: boolean;
        divided: boolean;
    };
    policies: {
        cakeFromOutside: 'not_allowed' | 'allowed_free' | 'allowed_fee';
        houseRules: string;
    };
}

const initialDetails: VenueDetails = {
    description: '',
    hospitality: {
        languages: ['Italiano'],
        customLanguages: '',
        groupsAllowed: true,
        maxGroupSize: 20,
    },
    kitchenHours: {
        lunch: { from: '12:00', to: '14:30' },
        dinner: { from: '19:00', to: '22:30' },
    },
    accessibility: {
        wheelchairAccess: false,
        accessibleRestroom: false,
        elevator: false,
        parking: false,
        ztl: false,
    },
    dietary: {
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        lactoseFree: false,
        organic: false,
        kidsMenu: false,
        halal: false,
        kosher: false,
    },
    amenities: {
        wifi: true,
        airConditioning: true,
        outdoorSeating: false,
        privateRoom: false,
        privateRoomCapacity: { min: 0, max: 0 },
        kidsArea: false,
        petsAllowed: true,
        changingTable: false,
        highChairs: 'available',
        sports: {
            available: false,
            hasTv: false,
            hasSky: false,
            hasDazn: false,
        },
    },
    atmosphere: [],
    paymentMethods: {
        creditCards: true,
        cash: true,
        digital: true,
    },
    policies: {
        cakeFromOutside: 'not_allowed',
        houseRules: '',
    },
};

const atmosphereOptions = [
    'Romantico', 'Business', 'Per famiglie', 'Informale', 'Elegante', 'Bistrot', 'Trattoria', 'Pizzeria'
];

const languageOptions = ['Italiano', 'Inglese', 'Francese', 'Spagnolo', 'Tedesco', 'Cinese', 'Giapponese', 'Russo'];

const RestaurantDetails: React.FC = () => {
    const [details, setDetails] = useState<VenueDetails>(initialDetails);
    const [isSaving, setIsSaving] = useState(false);

    const handleToggle = (
        section: keyof VenueDetails,
        field: string
    ) => {
        // @ts-ignore
        setDetails(prev => ({
            ...prev,
            [section]: {
                // @ts-ignore
                ...prev[section],
                // @ts-ignore
                [field]: !prev[section][field]
            }
        }));
    };

    const handleNestedChange = (section: keyof VenueDetails, field: string, value: any) => {
        // @ts-ignore
        setDetails(prev => ({
            ...prev,
            [section]: {
                // @ts-ignore
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleAtmosphereToggle = (option: string) => {
        setDetails(prev => {
            const current = prev.atmosphere;
            const updated = current.includes(option)
                ? current.filter(item => item !== option)
                : [...current, option];
            return { ...prev, atmosphere: updated };
        });
    };

    const handleLanguageToggle = (option: string) => {
        setDetails(prev => {
            const current = prev.hospitality.languages;
            const updated = current.includes(option)
                ? current.filter(item => item !== option)
                : [...current, option];
            return {
                ...prev,
                hospitality: {
                    ...prev.hospitality,
                    languages: updated
                }
            };
        });
    };

    const handleKitchenTimeChange = (shift: 'lunch' | 'dinner', field: 'from' | 'to', value: string) => {
        setDetails(prev => ({
            ...prev,
            kitchenHours: {
                ...prev.kitchenHours,
                [shift]: {
                    ...prev.kitchenHours[shift],
                    [field]: value
                }
            }
        }));
    };

    const handleSportsChange = (field: string) => {
        // @ts-ignore
        setDetails(prev => ({
            ...prev,
            amenities: {
                ...prev.amenities,
                sports: {
                    // @ts-ignore
                    ...prev.amenities.sports,
                    // @ts-ignore
                    [field]: !prev.amenities.sports[field]
                }
            }
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Mock save
        setTimeout(() => {
            setIsSaving(false);
            alert('Dati salvati con successo!');
        }, 1000);
    };

    return (
        <BaseLayout
            title="Dettagli Locale"
            navItems={restaurantNavItems}
            userRole="owner"
            userName="Luigi's Pasta"
        >
            <div className="max-w-5xl mx-auto space-y-6 mb-10">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Scheda informativa</h2>
                        <p className="text-sm text-slate-500">
                            Completa le informazioni per aiutare i clienti a scegliere il tuo locale.
                        </p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-2xl bg-brand-gradient text-white text-sm font-semibold px-6 py-2.5 hover:opacity-90 shadow-sm transition-all disabled:opacity-70"
                    >
                        {isSaving ? (
                            <span>Salvataggio...</span>
                        ) : (
                            <>
                                <Save size={18} />
                                Salva modifiche
                            </>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Descrizione Generale */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Info size={20} className="text-[#6366F1]" />
                            <h3 className="font-bold text-slate-800">Descrizione del locale</h3>
                        </div>
                        <textarea
                            value={details.description}
                            onChange={(e) => setDetails(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full min-h-[100px] p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1]"
                            placeholder="Racconta la storia del tuo locale, la cucina e l'atmosfera che si respira..."
                        />
                    </div>

                    {/* Orari Cucina */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock size={20} className="text-[#6366F1]" />
                            <h3 className="font-bold text-slate-800">Orari Cucina</h3>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="font-semibold text-slate-700 w-20">Pranzo</span>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                {/* <span>dalle</span> */}
                                <input
                                    type="time"
                                    value={details.kitchenHours.lunch.from}
                                    onChange={(e) => handleKitchenTimeChange('lunch', 'from', e.target.value)}
                                    className="bg-white border border-slate-200 rounded-lg px-2 py-1"
                                />
                                {/*<span>alle</span>*/}
                                <input
                                    type="time"
                                    value={details.kitchenHours.lunch.to}
                                    onChange={(e) => handleKitchenTimeChange('lunch', 'to', e.target.value)}
                                    className="bg-white border border-slate-200 rounded-lg px-2 py-1"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="font-semibold text-slate-700 w-20">Cena</span>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                {/* <span>dalle</span> */}
                                <input
                                    type="time"
                                    value={details.kitchenHours.dinner.from}
                                    onChange={(e) => handleKitchenTimeChange('dinner', 'from', e.target.value)}
                                    className="bg-white border border-slate-200 rounded-lg px-2 py-1"
                                />
                                {/*<span>alle</span>*/}
                                <input
                                    type="time"
                                    value={details.kitchenHours.dinner.to}
                                    onChange={(e) => handleKitchenTimeChange('dinner', 'to', e.target.value)}
                                    className="bg-white border border-slate-200 rounded-lg px-2 py-1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Accoglienza & Gruppi */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Users size={20} className="text-[#6366F1]" />
                            <h3 className="font-bold text-slate-800">Accoglienza</h3>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
                                <Languages size={16} className="text-slate-400" /> Lingue parlate
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {languageOptions.slice(0, 5).map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => handleLanguageToggle(lang)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${details.hospitality.languages.includes(lang)
                                            ? 'bg-indigo-50 text-[#6366F1] border border-[#6366F1]'
                                            : 'bg-white text-slate-500 border border-slate-200'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3">
                                <label className="text-xs text-slate-500 block mb-1">Altre lingue (separate da virgola)</label>
                                <input
                                    type="text"
                                    value={details.hospitality.customLanguages}
                                    onChange={(e) => handleNestedChange('hospitality', 'customLanguages', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                    placeholder="Es. Portoghese, Arabo..."
                                />
                            </div>
                        </div>

                        <div className="space-y-3 pt-2 border-t border-slate-100">
                            <ToggleItem
                                label="Gruppi numerosi ammessi"
                                checked={details.hospitality.groupsAllowed}
                                onChange={() => handleNestedChange('hospitality', 'groupsAllowed', !details.hospitality.groupsAllowed)}
                            />
                            {details.hospitality.groupsAllowed && (
                                <div className="flex items-center justify-between py-1 pl-4">
                                    <span className="text-xs text-slate-500">Max persone</span>
                                    <input
                                        type="number"
                                        value={details.hospitality.maxGroupSize}
                                        onChange={(e) => handleNestedChange('hospitality', 'maxGroupSize', parseInt(e.target.value))}
                                        className="w-20 text-right px-2 py-1 rounded-lg border border-slate-200 text-sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Diete e Intolleranze */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <UtensilsCrossed size={20} className="text-[#6366F1]" />
                            <h3 className="font-bold text-slate-800">Diete & Intolleranze</h3>
                        </div>
                        <div className="space-y-3">
                            <ToggleItem
                                label="Menu Bambini"
                                checked={details.dietary.kidsMenu}
                                onChange={() => handleToggle('dietary', 'kidsMenu')}
                            />
                            <ToggleItem
                                label="Opzioni Vegane"
                                checked={details.dietary.vegan}
                                onChange={() => handleToggle('dietary', 'vegan')}
                            />
                            <ToggleItem
                                label="Opzioni Vegetariane"
                                checked={details.dietary.vegetarian}
                                onChange={() => handleToggle('dietary', 'vegetarian')}
                            />
                            <ToggleItem
                                label="Senza Glutine"
                                checked={details.dietary.glutenFree}
                                onChange={() => handleToggle('dietary', 'glutenFree')}
                            />
                            <ToggleItem
                                label="Senza Lattosio"
                                checked={details.dietary.lactoseFree}
                                onChange={() => handleToggle('dietary', 'lactoseFree')}
                            />
                            <ToggleItem
                                label="Halal"
                                checked={details.dietary.halal}
                                onChange={() => handleToggle('dietary', 'halal')}
                            />
                            <ToggleItem
                                label="Kosher"
                                checked={details.dietary.kosher}
                                onChange={() => handleToggle('dietary', 'kosher')}
                            />


                        </div>
                    </div>

                    {/* Servizi & Amenities */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Wifi size={20} className="text-[#6366F1]" />
                            <h3 className="font-bold text-slate-800">Servizi</h3>
                        </div>
                        <div className="space-y-3">
                            <ToggleItem
                                label="Wi-Fi Gratuito"
                                checked={details.amenities.wifi}
                                onChange={() => handleToggle('amenities', 'wifi')}
                            />
                            <ToggleItem
                                label="Aria Condizionata"
                                checked={details.amenities.airConditioning}
                                onChange={() => handleToggle('amenities', 'airConditioning')}
                            />
                            <ToggleItem
                                label="Dehor / Esterno"
                                checked={details.amenities.outdoorSeating}
                                onChange={() => handleToggle('amenities', 'outdoorSeating')}
                            />
                            <ToggleItem
                                label="Saletta Privata"
                                checked={details.amenities.privateRoom}
                                onChange={() => handleToggle('amenities', 'privateRoom')}
                            />
                            {details.amenities.privateRoom && (
                                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 ml-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">Min persone</span>
                                        <input
                                            type="number"
                                            value={details.amenities.privateRoomCapacity.min}
                                            onChange={(e) => setDetails(prev => ({
                                                ...prev,
                                                amenities: {
                                                    ...prev.amenities,
                                                    privateRoomCapacity: { ...prev.amenities.privateRoomCapacity, min: parseInt(e.target.value) }
                                                }
                                            }))}
                                            className="w-16 text-center px-2 py-1 rounded-lg border border-slate-200 text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">Max persone</span>
                                        <input
                                            type="number"
                                            value={details.amenities.privateRoomCapacity.max}
                                            onChange={(e) => setDetails(prev => ({
                                                ...prev,
                                                amenities: {
                                                    ...prev.amenities,
                                                    privateRoomCapacity: { ...prev.amenities.privateRoomCapacity, max: parseInt(e.target.value) }
                                                }
                                            }))}
                                            className="w-16 text-center px-2 py-1 rounded-lg border border-slate-200 text-sm"
                                        />
                                    </div>
                                </div>
                            )}
                            {/* Family Services Subs */}
                            <div className="pt-2 mt-2 border-t border-slate-100">
                                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-500 uppercase">
                                    <Baby size={12} /> Per Famiglie
                                </div>
                                <ToggleItem
                                    label="Fasciatoio"
                                    checked={details.amenities.changingTable}
                                    onChange={() => handleToggle('amenities', 'changingTable')}
                                />
                                <div className="flex items-center justify-between py-1">
                                    <span className="text-sm text-slate-600">Seggioloni</span>
                                    <select
                                        value={details.amenities.highChairs}
                                        onChange={(e) => handleNestedChange('amenities', 'highChairs', e.target.value)}
                                        className="h-7 text-xs rounded-lg border border-slate-200 bg-white px-2"
                                    >
                                        <option value="none">No</option>
                                        <option value="limited">Numero limitato</option>
                                        <option value="available">Disponibili</option>
                                    </select>
                                </div>
                            </div>

                            {/* Sports Section */}
                            <div className="pt-2 mt-2 border-t border-slate-100">
                                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-500 uppercase">
                                    <Tv size={12} /> Sport & TV
                                </div>
                                <ToggleItem
                                    label="Eventi Sportivi"
                                    checked={details.amenities.sports.available}
                                    onChange={() => handleSportsChange('available')}
                                />
                                {details.amenities.sports.available && (
                                    <div className="grid grid-cols-2 gap-2 pl-4 mt-1">
                                        <label className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                                            <input
                                                type="checkbox"
                                                checked={details.amenities.sports.hasTv}
                                                onChange={() => handleSportsChange('hasTv')}
                                                className="rounded border-slate-300 text-[#6366F1]"
                                            />
                                            TV Disponibili
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                                            <input
                                                type="checkbox"
                                                checked={details.amenities.sports.hasSky}
                                                onChange={() => handleSportsChange('hasSky')}
                                                className="rounded border-slate-300 text-[#6366F1]"
                                            />
                                            Sky
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                                            <input
                                                type="checkbox"
                                                checked={details.amenities.sports.hasDazn}
                                                onChange={() => handleSportsChange('hasDazn')}
                                                className="rounded border-slate-300 text-[#6366F1]"
                                            />
                                            DAZN
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Accessibilità */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Accessibility size={20} className="text-[#6366F1]" />
                            <h3 className="font-bold text-slate-800">Accessibilità</h3>
                        </div>
                        <div className="space-y-3">
                            <ToggleItem
                                label="Locale in ZTL"
                                checked={details.accessibility.ztl}
                                onChange={() => handleToggle('accessibility', 'ztl')}
                            />
                            <ToggleItem
                                label="Accesso disabili"
                                checked={details.accessibility.wheelchairAccess}
                                onChange={() => handleToggle('accessibility', 'wheelchairAccess')}
                            />
                            <ToggleItem
                                label="Bagno disabili"
                                checked={details.accessibility.accessibleRestroom}
                                onChange={() => handleToggle('accessibility', 'accessibleRestroom')}
                            />
                            <ToggleItem
                                label="Ascensore"
                                checked={details.accessibility.elevator}
                                onChange={() => handleToggle('accessibility', 'elevator')}
                            />
                            <ToggleItem
                                label="Parcheggio dedicato"
                                checked={details.accessibility.parking}
                                onChange={() => handleToggle('accessibility', 'parking')}
                            />
                        </div>
                    </div>

                    {/* Regole della casa & Pagamenti */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Note & Policy Torte */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <ScrollText size={20} className="text-[#6366F1]" />
                                <h3 className="font-bold text-slate-800">Policy & Note</h3>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
                                    <Cake size={16} className="text-slate-400" /> Torte dall'esterno
                                </div>
                                <select
                                    value={details.policies.cakeFromOutside}
                                    onChange={(e) => handleNestedChange('policies', 'cakeFromOutside', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                                >
                                    <option value="not_allowed">Non consentite</option>
                                    <option value="allowed_free">Consentite gratuitamente</option>
                                    <option value="allowed_fee">Consentite con supplemento/fee</option>
                                </select>
                            </div>

                            <label className="block text-sm font-medium text-slate-700 mb-1">Altre regole o note</label>
                            <textarea
                                value={details.policies.houseRules}
                                onChange={(e) => handleNestedChange('policies', 'houseRules', e.target.value)}
                                className="w-full min-h-[100px] p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1]"
                                placeholder="Dress code, politiche cancellazione..."
                            />
                        </div>

                        {/* Metodi di pagamento */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 h-fit">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard size={20} className="text-[#6366F1]" />
                                <h3 className="font-bold text-slate-800">Pagamenti</h3>
                            </div>
                            <div className="space-y-3">
                                <ToggleItem
                                    label="Carte di Credito"
                                    checked={details.paymentMethods.creditCards}
                                    onChange={() => handleToggle('paymentMethods', 'creditCards')}
                                />
                                <ToggleItem
                                    label="Contanti"
                                    checked={details.paymentMethods.cash}
                                    onChange={() => handleToggle('paymentMethods', 'cash')}
                                />
                                <ToggleItem
                                    label="Pagamenti Digitali"
                                    checked={details.paymentMethods.digital}
                                    onChange={() => handleToggle('paymentMethods', 'digital')}
                                />
                                <ToggleItem
                                    label="Conti Separati"
                                    checked={details.paymentMethods.divided}
                                    onChange={() => handleToggle('paymentMethods', 'divided')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Atmosfera */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Armchair size={20} className="text-[#6366F1]" />
                            <h3 className="font-bold text-slate-800">Atmosfera</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {atmosphereOptions.map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleAtmosphereToggle(option)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${details.atmosphere.includes(option)
                                        ? 'bg-[#6366F1] text-white shadow-md'
                                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

// Helper component for toggle items
const ToggleItem = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div className="flex items-center justify-between py-1">
        <span className="text-sm text-slate-600">{label}</span>
        <button
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-[#6366F1]' : 'bg-slate-200'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    </div>
);

export default RestaurantDetails;
