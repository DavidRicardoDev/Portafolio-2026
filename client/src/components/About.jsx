import { useLanguage } from '../context/LanguageContext';
import { User, Code2, Rocket } from 'lucide-react';

const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-40 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white inline-block relative">
                        {t('nav.about')}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-start justify-center">

                    {/* Main Text Content */}
                    <div className="md:w-7/12 bg-slate-50 dark:bg-slate-800/50 p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                        <p className="mb-6 text-lg">
                            {t('about.paragraph1')}
                        </p>
                        <p className="text-lg">
                            {t('about.paragraph2')}
                        </p>
                    </div>

                    {/* Highlights / Cards */}
                    <div className="md:w-4/12 flex flex-col gap-6 w-full">
                        <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100 dark:border-slate-700">
                            <div className="p-3 bg-blue-500 rounded-lg text-white shadow-sm">
                                <User size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">{t('about.age')}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">23</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/80 border border-purple-100 dark:border-slate-700">
                            <div className="p-3 bg-purple-500 rounded-lg text-white shadow-sm">
                                <Code2 size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">{t('about.focus')}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Full Stack Web & Python</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/80 border border-indigo-100 dark:border-slate-700">
                            <div className="p-3 bg-indigo-500 rounded-lg text-white shadow-sm">
                                <Rocket size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">{t('about.mindset')}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Continuous Learning</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
