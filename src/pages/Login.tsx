import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User, Loader2, AlertCircle } from 'lucide-react';
import { login } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const performLogin = async (u: string, p: string) => {
        setLoading(true);
        setError(null);

        try {
            // DEMO MODE: Skip backend call for demo credentials
            if (u === 'admin' && p === 'password123') {
                // Simulate successful login
                const fakeToken = 'demo_token_' + Date.now();
                authLogin(fakeToken, 'admin');
                navigate('/dashboard');
                return;
            }

            if (u === 'owner' && p === 'password123') {
                const fakeToken = 'demo_token_' + Date.now();
                authLogin(fakeToken, 'owner');
                navigate('/dashboard');
                return;
            }

            // Try real backend login for non-demo credentials
            // OAuth2 expects x-www-form-urlencoded
            const params = new URLSearchParams();
            params.append('username', u);
            params.append('password', p);

            const response = await login(params as any);
            const role = u.toLowerCase().includes('admin') ? 'admin' : 'owner';
            authLogin(response.access_token, role);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await performLogin(username, password);
    };

    const handleDemoLogin = async () => {
        setUsername('admin');
        setPassword('password123');
        await performLogin('admin', 'password123');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg opacity-20 blur-[120px] pointer-events-none">
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full" />
            </div>

            <div className="w-full max-w-md relative">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
                            <LogIn className="w-8 h-8 text-[#6366F1]" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                        <p className="text-slate-400 mt-2">Log in to manage your restaurant</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Username or Email</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="admin@vico.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-slate-300">Password</label>
                                <a href="#" className="text-xs text-[#6366F1] hover:text-indigo-400 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-gradient hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-2 text-slate-500">Testing Tools</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={handleDemoLogin}
                                disabled={loading}
                                className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-semibold py-3 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 group"
                            >
                                <span className="w-2 h-2 bg-[#6366F1] rounded-full animate-pulse" />
                                Admin Demo (admin/password123)
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setUsername('owner');
                                    setPassword('password123');
                                    performLogin('owner', 'password123');
                                }}
                                disabled={loading}
                                className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-semibold py-3 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 group"
                            >
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                Owner Demo (owner/password123)
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-slate-500 text-sm mt-8">
                        Don't have an account?{' '}
                        <a href="#" className="text-[#6366F1] font-medium hover:text-indigo-400 transition-colors">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
