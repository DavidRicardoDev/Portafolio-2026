import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit3, Home, X, Save } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title_es: '', title_en: '', description_es: '', description_en: '',
        technologies: '', repo_url: '', demo_url: '', image_url: '',
        status: 'completed', is_placeholder: false
    });

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchProjects();
    }, [navigate, token]);

    const fetchProjects = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/projects');
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este proyecto de la base de datos?')) return;
        
        try {
            const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchProjects();
        } catch (err) {
            alert('Error al eliminar');
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingId(project.id);
            setFormData({
                title_es: project.title_es || '', title_en: project.title_en || '',
                description_es: project.description_es || '', description_en: project.description_en || '',
                technologies: typeof project.technologies === 'string' ? JSON.parse(project.technologies).join(', ') : (project.technologies?.join(', ') || ''),
                repo_url: project.repo_url || '', demo_url: project.demo_url || '',
                image_url: project.image_url || '', status: project.status || 'completed',
                is_placeholder: project.is_placeholder || false
            });
        } else {
            setEditingId(null);
            setFormData({
                title_es: '', title_en: '', description_es: '', description_en: '',
                technologies: '', repo_url: '', demo_url: '', image_url: '',
                status: 'completed', is_placeholder: false
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Convert comma-separated string back to array
        const techArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
        const payload = { ...formData, technologies: techArray };

        const url = editingId ? `http://localhost:3000/api/projects/${editingId}` : 'http://localhost:3000/api/projects';
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchProjects();
            } else {
                alert('Error al guardar. Verifica tu sesión.');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">Cargando / Loading...</div>;

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
                {/* Header Acciones */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Gestión de Proyectos</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Añade, edita o elimina proyectos de forma segura.</p>
                    </div>
                    <button onClick={() => openModal()} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg font-medium transition-all">
                        <Plus size={20} /> <span className="hidden sm:inline">Nuevo Proyecto</span>
                    </button>
                </div>

                {/* Lista de Proyectos */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto">
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
                                            <button onClick={() => openModal(project)} className="p-2 text-slate-400 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 dark:bg-slate-700 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Editar">
                                                <Edit3 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(project.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-100 hover:bg-red-50 dark:bg-slate-700 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Eliminar">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )})}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center text-slate-500 dark:text-slate-400">
                                        No hay proyectos registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Creación/Edición */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/30">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                                {editingId ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                            <form id="project-form" onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Título (Español)</label>
                                        <input required type="text" value={formData.title_es} onChange={e => setFormData({...formData, title_es: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Título (Inglés)</label>
                                        <input required type="text" value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descripción (Español)</label>
                                        <textarea required rows="3" value={formData.description_es} onChange={e => setFormData({...formData, description_es: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none resize-none"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descripción (Inglés)</label>
                                        <textarea required rows="3" value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none resize-none"></textarea>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tecnologías (Separadas por comas)</label>
                                    <input required type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, Tailwind..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL del Repositorio Github</label>
                                        <input type="text" value={formData.repo_url} onChange={e => setFormData({...formData, repo_url: e.target.value})} placeholder="https://github.com/..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL del Demo en Vivo</label>
                                        <input type="text" value={formData.demo_url} onChange={e => setFormData({...formData, demo_url: e.target.value})} placeholder="https://mi-app.com o /demos/mi-app" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none" />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL de la Imagen</label>
                                    <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="/projects/imagen.jpg (En la carpeta public)" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none" />
                                </div>

                                <div className="flex items-center gap-8 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={formData.status === 'construction'} onChange={e => setFormData({...formData, status: e.target.checked ? 'construction' : 'completed'})} className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Marcar como "En Construcción"</span>
                                    </label>
                                    
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={formData.is_placeholder} onChange={e => setFormData({...formData, is_placeholder: e.target.checked})} className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Es un Dato de Relleno (Se enviará al final)</span>
                                    </label>
                                </div>
                            </form>
                        </div>
                        
                        <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 flex justify-end gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                Cancelar
                            </button>
                            <button form="project-form" type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg shadow-md font-medium transition-colors">
                                <Save size={20} /> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
