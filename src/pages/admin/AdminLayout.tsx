import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LayoutDashboard, Utensils, Users } from 'lucide-react';
import BaseLayout from '../../components/layout/BaseLayout';
import AdminDashboard from './AdminDashboard';
import AdminRestaurants from './AdminRestaurants';
import AdminUsers from './AdminUsers';

const AdminLayout: React.FC = () => {
    const navItems = [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { label: 'Ristoranti', icon: <Utensils size={20} />, path: '/admin/restaurants' },
        { label: 'Utenti', icon: <Users size={20} />, path: '/admin/users' },
    ];

    return (
        <BaseLayout
            title="Admin Overview"
            navItems={navItems}
            userRole="admin"
            userName="Admin"
        >
            <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="restaurants" element={<AdminRestaurants />} />
                <Route path="users" element={<AdminUsers />} />
            </Routes>
        </BaseLayout>
    );
};

export default AdminLayout;

