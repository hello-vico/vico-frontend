import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
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

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, title, navItems, userRole, userName }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-8">
                    <div className="flex items-center gap-3 text-emerald-600 font-bold text-3xl tracking-tight">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                            V
                        </div>
                        VICO
                    </div>
                    <div className="mt-2 px-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {userRole === 'admin' ? 'Amministratore' : 'Ristoratore'}
                        </span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl transition-all duration-200 group ${isActive
                                    ? 'bg-emerald-50 text-emerald-600 font-semibold shadow-sm shadow-emerald-100'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                                    }`}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-100 space-y-1.5">
                    <button
                        onClick={() => navigate(`/${userRole}/settings`)}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        <Settings size={20} className="text-slate-400" />
                        Impostazioni
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-colors mt-2"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-20">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Gestione {userRole === 'admin' ? 'piattaforma VICO' : 'ristorante'}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-2xl border border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200 shadow-sm overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${userName}&background=10b981&color=fff`} alt={userName} />
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
