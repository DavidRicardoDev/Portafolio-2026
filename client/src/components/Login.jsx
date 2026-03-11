import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin');
            } else {
                setError('Contraseña incorrecta / Invalid password');
            }
        } catch (err) {
            setError('Error de conexión / Connection error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors px-4">
            <button 
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-md hover:scale-110 transition-transform"
            >
                <ArrowLeft size={24} />
            </button>

            <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Access</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 text-center">
                        Área restringida. Ingresa la contraseña maestra para continuar.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="*************"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-900 dark:text-white outline-none transition-all placeholder-slate-400"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center animate-fade-in">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Verificando...' : 'Entrar al Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
