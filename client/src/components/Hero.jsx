import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] opacity-50 animate-pulse" />
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] opacity-50 animate-pulse delay-1000" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Text Content */}
                <div className="text-center md:text-left md:w-1/2 z-10">
                    <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-4 tracking-wide">
                        {t('hero.greeting')} David Peña
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        {t('hero.role')}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                            Frontend & AI
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
                        {t('hero.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="#projects"
                            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5"
                        >
                            {t('hero.cta')}
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* Image Placeholder */}
                <div className="md:w-1/2 flex justify-center items-center relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center relative z-10 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
                        <span className="text-slate-400 dark:text-slate-500 font-medium">Your Photo Here</span>
                    </div>
                    {/* Decorative elements behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-2xl -z-10 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
