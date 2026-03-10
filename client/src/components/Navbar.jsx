import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Globe } from 'lucide-react';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
                            David Peña
                        </h1>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                >
                                    {t(`nav.${item}`)}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 font-semibold"
                            aria-label="Toggle Language"
                        >
                            <Globe size={20} />
                            <span>{language.toUpperCase()}</span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
