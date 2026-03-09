import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    const { t, language } = useLanguage();
    const [projects, setProjects] = useState([]);

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
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800 dark:text-white">
                    {t('nav.projects')}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col">
                            <div className="h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center relative overflow-hidden group">
                                {/* Placeholder for project image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500" />
                                <span className="text-slate-400 font-medium">Project Preview</span>
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
                                    {project.repo_url && (
                                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            <Github size={18} /> Code
                                        </a>
                                    )}
                                    {project.demo_url && (
                                        project.demo_url.startsWith('/') ? (
                                            <a href={project.demo_url} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                <ExternalLink size={18} /> Live Demo
                                            </a>
                                        ) : (
                                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                <ExternalLink size={18} /> Live Demo
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
