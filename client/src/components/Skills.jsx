import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as Icons from 'lucide-react';

const Skills = () => {
    const { t } = useLanguage();
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/skills')
            .then(res => res.json())
            .then(data => setSkills(data))
            .catch(err => console.error('Error fetching skills:', err));
    }, []);

    // Helper to dynamically render Lucide icons
    const renderIcon = (iconName) => {
        const IconComponent = Icons[iconName] || Icons.Code; // Default to Code icon
        return <IconComponent size={24} />;
    };

    return (
        <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800 dark:text-white">
                    {t('nav.skills')}
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="p-6 w-[calc(50%-12px)] md:w-[calc(25%-18px)] bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-4 group"
                        >
                            <div className="text-blue-600 dark:text-blue-400 p-3 rounded-full bg-blue-50 dark:bg-slate-700 group-hover:scale-110 transition-transform">
                                {/* Map common names to Lucide icons manually if dynamic fails or simplify */}
                                {/* For this MVP, we try dynamic or fallback. in Seed we used 'react', 'palette', 'server', 'database' */}
                                {skill.icon_class === 'react' && <Icons.Atom size={32} />}
                                {skill.icon_class === 'palette' && <Icons.Palette size={32} />}
                                {skill.icon_class === 'server' && <Icons.Server size={32} />}
                                {skill.icon_class === 'database' && <Icons.Database size={32} />}
                                {skill.icon_class === 'python' && <Icons.Terminal size={32} />}
                            </div>
                            <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200">{skill.name}</h3>
                            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-medium">{skill.category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
