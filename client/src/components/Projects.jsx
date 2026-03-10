import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    const { t, language } = useLanguage();
    const [projects, setProjects] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error('Error fetching projects:', err));
    }, []);

    // Helper to safely get technologies array
    const getTechnologies = (techData) => {
        if (!techData) return [];
        if (Array.isArray(techData)) return techData;
        try {
            return JSON.parse(techData);
        } catch (e) {
            console.error("Failed to parse technologies:", techData);
            return [];
        }
    };

    return (
        <section id="projects" className="py-20 bg-white dark:bg-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white inline-block relative">
                        {t('nav.projects')}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(showAll ? projects : projects.slice(0, 3)).map((project) => (
                        <div key={project.id} className="bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col">
                            <div className="h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center relative overflow-hidden group">
                                {/* Optional custom image */}
                                {project.image_url ? (
                                    <img
                                        src={project.image_url}
                                        alt={project.title_en}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500" />
                                        <span className="text-slate-400 font-medium z-0">{t('projects.preview')}</span>
                                    </>
                                )}

                                {/* Under Construction Overlay */}
                                {project.status === 'construction' && (
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-10 transition-opacity">
                                        <div className="bg-amber-500 text-amber-950 font-bold px-6 py-2 rounded-full shadow-lg transform -rotate-6 border-2 border-amber-300 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                                            {t('projects.underConstruction')}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
                                    {language === 'es' ? project.title_es : project.title_en}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4 flex-1">
                                    {language === 'es' ? project.description_es : project.description_en}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {getTechnologies(project.technologies).map((tech, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 mt-auto">
                                    {/* Only show these links if it is NOT a placeholder/construction project */}
                                    {project.status !== 'construction' && (
                                        <>
                                            {project.repo_url && (
                                                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    <Github size={18} /> {t('projects.code')}
                                                </a>
                                            )}
                                            {project.demo_url && (
                                                project.demo_url.startsWith('/') ? (
                                                    <a href={project.demo_url} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                        <ExternalLink size={18} /> {t('projects.demo')}
                                                    </a>
                                                ) : (
                                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                        <ExternalLink size={18} /> {t('projects.demo')}
                                                    </a>
                                                )
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2"
                        >
                            {showAll ? t('projects.showLess') : t('projects.showMore')}
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
