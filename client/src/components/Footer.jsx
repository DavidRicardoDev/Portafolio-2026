import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 py-12 border-t border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent mb-2">
                            David Peña
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                            Desarrollador Tecnólogo enfocado en crear experiencias digitales modernas y eficientes.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:contact.davidpenadev@gmail.com" className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © {currentYear} David Peña. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
                        <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.about')}</a>
                        <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.projects')}</a>
                        <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.contact')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
