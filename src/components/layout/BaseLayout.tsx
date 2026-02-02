import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings, PanelLeft, PanelLeftClose } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavItem {
    label: string;
    icon: React.ReactNode;
    path: string;
}

interface BaseLayoutProps {
    children: React.ReactNode;
    title: string;
    navItems: NavItem[];
    userRole: 'admin' | 'owner';
    userName: string;
}

const SIDEBAR_COLLAPSED_KEY = 'vico-sidebar-collapsed';

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, title, navItems, userRole, userName }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [isCollapsed, setIsCollapsed] = useState(() => {
        const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside className={`${isCollapsed ? 'w-20' : 'w-72'} bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen transition-all duration-300`}>
                <div className={`${isCollapsed ? 'p-4' : 'p-8'} flex flex-col items-center`}>
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} text-[#6366F1] font-bold text-3xl tracking-tight`}>
                        <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-lg shadow-indigo-200 flex-shrink-0">
                            V
                        </div>
                        {!isCollapsed && 'VICO'}
                    </div>
                    {!isCollapsed && userRole === 'admin' && (
                        <div className="mt-2 px-1 w-full">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full block text-center">
                                {userRole === 'admin' ? 'Amministratore' : ''}
                            </span>
                        </div>
                    )}
                </div>

                <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} space-y-1.5`}>
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                title={isCollapsed ? item.label : undefined}
                                className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3.5 w-full rounded-2xl transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-50 text-[#6366F1] font-semibold shadow-sm shadow-indigo-100'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-[#6366F1]' : 'text-slate-400 group-hover:text-slate-600'
                                    }`}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className={`p-6 border-t border-slate-100 space-y-1.5 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                    <button title="Impostazioni"
                        onClick={() =>
                            navigate(userRole === 'admin' ? '/admin/settings' : '/restaurant/settings')
                        }
                        className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-3 w-full rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors`}
                    >
                        <Settings size={20} className="text-slate-400 flex-shrink-0" />
                        {!isCollapsed && 'Impostazioni'}
                    </button>
                    <button title="Logout"
                        onClick={handleLogout}
                        className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-3 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-colors mt-2`}
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        {!isCollapsed && 'Logout'}
                    </button>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`flex items-center justify-center ${isCollapsed ? 'w-10 h-10 p-0' : 'w-full px-4 py-3 gap-2'} rounded-2xl bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-[#6366F1] transition-all duration-200 mt-4 shadow-sm`}
                        title={isCollapsed ? 'Espandi menu' : 'Comprimi menu'}
                    >
                        {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
                        {!isCollapsed && <span className="text-xs font-medium">Comprimi</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Floating Bottom Navigation */}
            <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-white rounded-2xl shadow-xl shadow-indigo-200/50 border border-slate-200 px-2 py-2 flex items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px] ${isActive
                                    ? 'bg-indigo-50 text-[#6366F1]'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <span className={`w-[22px] h-[22px] flex items-center justify-center ${isActive ? 'text-[#6366F1]' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="text-[10px] font-medium leading-none">
                                    {item.label.length > 8 ? item.label.substring(0, 6) + '...' : item.label}
                                </span>
                            </button>
                        );
                    })}
                    <button
                        onClick={() =>
                            navigate(userRole === 'admin' ? '/admin/settings' : '/restaurant/settings')
                        }
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px] text-slate-400 hover:text-slate-600"
                    >
                        <Settings size={22} />
                        <span className="text-[10px] font-medium leading-none">Impost.</span>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden pb-24 md:pb-0">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-20">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Gestione {userRole === 'admin' ? 'piattaforma VICO' : 'ristorante'}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-2xl border border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-[#6366F1] font-bold border border-indigo-200 shadow-sm overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${userName}&background=6366F1&color=fff`} alt={userName} />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-bold text-slate-900">{userName}</p>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Online</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-slate-50/50">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BaseLayout;
