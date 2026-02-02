import React from 'react';
import { LayoutDashboard, Calendar, Utensils } from 'lucide-react';

export const restaurantNavItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/restaurant/dashboard' },
    { label: 'Prenotazioni', icon: <Calendar size={20} />, path: '/restaurant/reservations' },
    { label: 'Menu', icon: <Utensils size={20} />, path: '/restaurant/menu' },
];

