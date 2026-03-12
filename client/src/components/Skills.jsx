import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '../config';

const Skills = () => {
    const { t, language } = useLanguage();
    const [skills, setSkills] = useState([]);
    const [activeSkill, setActiveSkill] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/skills`)
            .then(res => res.json())
            .then(data => setSkills(data))
            .catch(err => console.error('Error fetching skills:', err));
    }, []);

    // Simplified Icon Mapping
    const getIcon = (iconClass) => {
        const iconMap = {
            'react': Icons.Atom,
            'palette': Icons.Palette,
            'server': Icons.Server,
            'database': Icons.Database,
            'python': Icons.Terminal,
            'terminal': Icons.Terminal,
            'code': Icons.Code2,
            'globe': Icons.Globe
        };
        const IconComponent = iconMap[iconClass.toLowerCase()] || Icons.Code2;
        return <IconComponent size={32} />;
    };

    return (
        <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white inline-block relative">
                        {t('nav.skills')}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center items-start gap-6">
                    {skills.map((skill, i) => {
                        const isActive = activeSkill === skill.id;
                        const desc = language === 'es' ? skill.description_es : skill.description_en;

                        return (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                onMouseEnter={() => setActiveSkill(skill.id)}
                                onClick={() => setActiveSkill(isActive ? null : skill.id)}
                                onMouseLeave={() => setActiveSkill(null)}
                                className={`relative p-6 w-[calc(50%-12px)] md:w-[calc(25%-18px)] bg-white dark:bg-slate-800 rounded-xl shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-start gap-4 group cursor-pointer ${isActive ? 'scale-105 z-20 ring-2 ring-blue-500/50 shadow-xl' : 'hover:-translate-y-1 z-10'}`}
                            >
                                <div className="text-blue-600 dark:text-blue-400 p-3 rounded-full bg-blue-50 dark:bg-slate-700 group-hover:scale-110 transition-transform">
                                    {getIcon(skill.icon_class)}
                                </div>
                                <div className="text-center w-full relative z-10">
                                    <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200">{skill.name}</h3>
                                    <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-medium">{skill.category}</span>
                                </div>

                                {/* Floating Tooltip Description */}
                                <div
                                    className={`absolute top-[105%] left-1/2 w-[250px] md:w-[280px] -translate-x-1/2 bg-white dark:bg-slate-800 p-5 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 text-sm text-center text-slate-600 dark:text-slate-300 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 cursor-default
                                    ${isActive ? 'opacity-100 translate-y-2 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
                                >
                                    {/* Little Arrow pointing up */}
                                    <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white dark:bg-slate-800 border-t border-l border-slate-200 dark:border-slate-700 transform rotate-45"></div>
                                    <span className="relative z-10 font-medium leading-relaxed">{desc}</span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
