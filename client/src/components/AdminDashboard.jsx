import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit3, Home, X, Save, Layers, Code2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'skills'
    const [isLoading, setIsLoading] = useState(true);

    // --- Projects State ---
    const [projects, setProjects] = useState([]);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [projectForm, setProjectForm] = useState({
        title_es: '', title_en: '', description_es: '', description_en: '',
        technologies: '', repo_url: '', demo_url: '', image_url: '',
        status: 'completed', is_placeholder: false
    });

    // --- Skills State ---
    const [skills, setSkills] = useState([]);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [editingSkillId, setEditingSkillId] = useState(null);
    const [skillForm, setSkillForm] = useState({
        name: '', icon_class: 'code', category: 'Frontend', description_es: '', description_en: ''
    });

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchAllData();
    }, [navigate, token]);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [projRes, skillRes] = await Promise.all([
                fetch('http://localhost:3000/api/projects'),
                fetch('http://localhost:3000/api/skills')
            ]);
            const projData = await projRes.json();
            const skillData = await skillRes.json();
            setProjects(projData);
            setSkills(skillData);
        } catch (err) {
            toast.error('Error cargando datos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.success('Sesión cerrada');
        navigate('/login');
    };

    // ================= PROJECTS LOGIC =================

    const deleteProject = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este proyecto?')) return;
        try {
            const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
                toast.success('Proyecto eliminado');
            } else toast.error('Error al eliminar');
        } catch (err) { toast.error('Error de conexión'); }
    };

    const openProjectModal = (project = null) => {
        if (project) {
            setEditingProjectId(project.id);
            setProjectForm({
                title_es: project.title_es || '', title_en: project.title_en || '',
                description_es: project.description_es || '', description_en: project.description_en || '',
                technologies: typeof project.technologies === 'string' ? JSON.parse(project.technologies).join(', ') : (project.technologies?.join(', ') || ''),
                repo_url: project.repo_url || '', demo_url: project.demo_url || '',
                image_url: project.image_url || '', status: project.status || 'completed',
                is_placeholder: Boolean(project.is_placeholder)
            });
        } else {
            setEditingProjectId(null);
            setProjectForm({
                title_es: '', title_en: '', description_es: '', description_en: '',
                technologies: '', repo_url: '', demo_url: '', image_url: '',
                status: 'completed', is_placeholder: false
            });
        }
        setIsProjectModalOpen(true);
    };

    const saveProject = async (e) => {
        e.preventDefault();
        const techArray = projectForm.technologies.split(',').map(t => t.trim()).filter(t => t);
        const payload = { ...projectForm, technologies: techArray };
        const url = editingProjectId ? `http://localhost:3000/api/projects/${editingProjectId}` : 'http://localhost:3000/api/projects';
        const method = editingProjectId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setIsProjectModalOpen(false);
                fetchAllData();
                toast.success(editingProjectId ? 'Proyecto actualizado' : 'Proyecto creado');
            } else toast.error('Error al guardar');
        } catch (err) { toast.error('Error de conexión'); }
    };

    // ================= SKILLS LOGIC =================

    const deleteSkill = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar esta habilidad?')) return;
        try {
            const res = await fetch(`http://localhost:3000/api/skills/${id}`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setSkills(skills.filter(s => s.id !== id));
                toast.success('Habilidad eliminada');
            } else toast.error('Error al eliminar');
        } catch (err) { toast.error('Error de conexión'); }
    };

    const openSkillModal = (skill = null) => {
        if (skill) {
            setEditingSkillId(skill.id);
            setSkillForm({
                name: skill.name || '', icon_class: skill.icon_class || 'code',
                category: skill.category || 'Frontend', description_es: skill.description_es || '', description_en: skill.description_en || ''
            });
        } else {
            setEditingSkillId(null);
            setSkillForm({
                name: '', icon_class: 'code', category: 'Frontend', description_es: '', description_en: ''
            });
        }
        setIsSkillModalOpen(true);
    };

    const saveSkill = async (e) => {
        e.preventDefault();
        const url = editingSkillId ? `http://localhost:3000/api/skills/${editingSkillId}` : 'http://localhost:3000/api/skills';
        const method = editingSkillId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(skillForm)
            });
            if (res.ok) {
                setIsSkillModalOpen(false);
                fetchAllData();
                toast.success(editingSkillId ? 'Habilidad actualizada' : 'Habilidad creada');
            } else toast.error('Error al guardar');
        } catch (err) { toast.error('Error de conexión'); }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">Cargando datos seguros...</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors pb-20 relative">
            {/* Topbar */}
            <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sticky top-0 z-40 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-2 text-slate-500 hover:text-blue-600 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded-full transition-colors" title="Ir al Home">
                        <Home size={20} />
                    </button>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                        Panel de Control
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-bold border border-green-200 dark:border-green-800 hidden sm:inline-block">ADMIN ACTIVO</span>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/30 px-4 py-2 rounded-lg transition-colors">
                        <LogOut size={18} /> Salir
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 bg-slate-200 dark:bg-slate-800 p-1.5 rounded-xl mb-8 w-max max-w-full">
                    <button 
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${activeTab === 'projects' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
                    >
                        <Layers size={18} /> Proyectos
                    </button>
                    <button 
                        onClick={() => setActiveTab('skills')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${activeTab === 'skills' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
                    >
                        <Code2 size={18} /> Habilidades
                    </button>
                </div>

                {/* Header Acciones */}
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                            Gestión de {activeTab === 'projects' ? 'Proyectos' : 'Habilidades'}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Añade, edita o elimina elementos de tu portafolio.</p>
                    </div>
                    <button 
                        onClick={() => activeTab === 'projects' ? openProjectModal() : openSkillModal()} 
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg font-medium transition-all"
                    >
                        <Plus size={20} /> <span className="hidden sm:inline">Nuevo {activeTab === 'projects' ? 'Proyecto' : 'Skill'}</span>
                    </button>
                </div>

                {/* Lista de Proyectos */}
                {activeTab === 'projects' && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto animate-fade-in">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                                    <th className="p-4 font-semibold w-1/2">PROYECTO & TECNOLOGÍAS</th>
                                    <th className="p-4 font-semibold">ESTADO</th>
                                    <th className="p-4 font-semibold text-right">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => {
                                    const techList = typeof project.technologies === 'string' ? project.technologies : JSON.stringify(project.technologies);
                                    return (
                                    <tr key={project.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                        <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                                            {project.title_es}
                                            <div className="text-xs text-slate-400 font-normal mt-1 truncate max-w-xs">{techList}</div>
                                        </td>
                                        <td className="p-4">
                                            {project.status === 'construction' ? (
                                                <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">EN CONSTRUCCIÓN</span>
                                            ) : (
                                                <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">COMPLETADO</span>
                                            )}
                                            {project.is_placeholder === 1 && <span className="ml-2 text-[10px] text-slate-400 uppercase">Dummy</span>}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-3">
                                                <button onClick={() => openProjectModal(project)} className="p-2 text-slate-400 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 dark:bg-slate-700 dark:hover:bg-blue-900/30 rounded-lg transition-colors"><Edit3 size={18} /></button>
                                                <button onClick={() => deleteProject(project.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-100 hover:bg-red-50 dark:bg-slate-700 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )})}
                                {projects.length === 0 && (
                                    <tr><td colSpan="3" className="p-8 text-center text-slate-500 dark:text-slate-400">No hay proyectos registrados.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Lista de Skills */}
                {activeTab === 'skills' && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto animate-fade-in">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                                    <th className="p-4 font-semibold w-1/3">HABILIDAD (ICONO)</th>
                                    <th className="p-4 font-semibold">CATEGORÍA</th>
                                    <th className="p-4 font-semibold text-right">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skills.map((skill) => {
                                    return (
                                    <tr key={skill.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                        <td className="p-4 font-medium text-slate-800 dark:text-slate-200 flex items-center gap-3">
                                            <div className="text-blue-500 bg-blue-50 dark:bg-slate-700 p-2 rounded-lg">
                                                <Code2 size={18} />
                                            </div>
                                            {skill.name}
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">{skill.category}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-3">
                                                <button onClick={() => openSkillModal(skill)} className="p-2 text-slate-400 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 dark:bg-slate-700 dark:hover:bg-blue-900/30 rounded-lg transition-colors"><Edit3 size={18} /></button>
                                                <button onClick={() => deleteSkill(skill.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-100 hover:bg-red-50 dark:bg-slate-700 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )})}
                                {skills.length === 0 && (
                                    <tr><td colSpan="3" className="p-8 text-center text-slate-500 dark:text-slate-400">No hay habilidades registradas.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal - PROYECTOS */}
            {isProjectModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/30">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{editingProjectId ? 'Editar Proyecto' : 'Crear Proyecto'}</h3>
                            <button onClick={() => setIsProjectModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-200 dark:bg-slate-700 rounded-full"><X size={20} /></button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                            <form id="project-form" onSubmit={saveProject} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-white text-left">Título (ES)</label>
                                        <input required type="text" value={projectForm.title_es} onChange={e => setProjectForm({...projectForm, title_es: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-white text-left">Título (EN)</label>
                                        <input required type="text" value={projectForm.title_en} onChange={e => setProjectForm({...projectForm, title_en: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-white text-left">Descripción (ES)</label>
                                        <textarea required rows="3" value={projectForm.description_es} onChange={e => setProjectForm({...projectForm, description_es: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white resize-none"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-white text-left">Descripción (EN)</label>
                                        <textarea required rows="3" value={projectForm.description_en} onChange={e => setProjectForm({...projectForm, description_en: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white resize-none"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-white text-left">Tecnologías (Comas)</label>
                                    <input required type="text" value={projectForm.technologies} onChange={e => setProjectForm({...projectForm, technologies: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label className="block text-sm font-medium mb-2 dark:text-white text-left">URL Github</label><input type="text" value={projectForm.repo_url} onChange={e => setProjectForm({...projectForm, repo_url: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white" /></div>
                                    <div><label className="block text-sm font-medium mb-2 dark:text-white text-left">URL Demo</label><input type="text" value={projectForm.demo_url} onChange={e => setProjectForm({...projectForm, demo_url: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white" /></div>
                                </div>
                                <div><label className="block text-sm font-medium mb-2 dark:text-white text-left">URL Imagen (Ej: /projects/foto.jpg)</label><input type="text" value={projectForm.image_url} onChange={e => setProjectForm({...projectForm, image_url: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white" /></div>
                                <div className="flex gap-8 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-700">
                                    <label className="flex items-center gap-2 cursor-pointer dark:text-white"><input type="checkbox" checked={projectForm.status === 'construction'} onChange={e => setProjectForm({...projectForm, status: e.target.checked ? 'construction' : 'completed'})} className="w-5 h-5" /> En Construcción</label>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 flex justify-end gap-4">
                            <button onClick={() => setIsProjectModalOpen(false)} className="px-6 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-300">Cancelar</button>
                            <button form="project-form" type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg"><Save size={20}/> Guardar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal - SKILLS */}
            {isSkillModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/30">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{editingSkillId ? 'Editar Habilidad' : 'Crear Habilidad'}</h3>
                            <button onClick={() => setIsSkillModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-200 dark:bg-slate-700 rounded-full"><X size={20} /></button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                            <form id="skill-form" onSubmit={saveSkill} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-white text-left">Nombre de la Habilidad</label>
                                        <input required type="text" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} placeholder="Ej: React, Python, UI/UX" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-white text-left">Categoría</label>
                                        <select required value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white">
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Database">Database</option>
                                            <option value="Tools">Tools</option>
                                            <option value="Design">Design</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-white text-left">Clase / Nombre del Icono</label>
                                    <select required value={skillForm.icon_class} onChange={e => setSkillForm({...skillForm, icon_class: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white">
                                        <option value="react">react (Átomo)</option>
                                        <option value="palette">palette (Diseño/UI)</option>
                                        <option value="server">server (Backend/APIs)</option>
                                        <option value="database">database (SQL/NoSQL)</option>
                                        <option value="terminal">terminal (Scripts/Python)</option>
                                        <option value="globe">globe (Web/Navegadores)</option>
                                        <option value="code">code (Lenguajes generales)</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-white text-left">Descripción / Nivel (ES)</label>
                                        <textarea required rows="2" value={skillForm.description_es} onChange={e => setSkillForm({...skillForm, description_es: e.target.value})} placeholder="Ej: Avanzado - 3 años de exp." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white resize-none"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-white text-left">Descripción / Nivel (EN)</label>
                                        <textarea required rows="2" value={skillForm.description_en} onChange={e => setSkillForm({...skillForm, description_en: e.target.value})} placeholder="Ej: Advanced - 3 years of exp." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:text-white resize-none"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 flex justify-end gap-4">
                            <button onClick={() => setIsSkillModalOpen(false)} className="px-6 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-300">Cancelar</button>
                            <button form="skill-form" type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg"><Save size={20}/> Guardar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
