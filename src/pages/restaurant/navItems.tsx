import { LayoutDashboard, Calendar, Utensils, LayoutGrid } from 'lucide-react';

export const restaurantNavItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/restaurant/dashboard' },
    { label: 'Prenotazioni', icon: <Calendar size={20} />, path: '/restaurant/reservations' },
    { label: 'Sale e Tavoli', icon: <LayoutGrid size={20} />, path: '/restaurant/rooms' },
    { label: 'Menu', icon: <Utensils size={20} />, path: '/restaurant/menu' },
];

