import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TodoDemo = () => {
    const { t } = useLanguage();
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error(err));
    }, []);

    const addTodo = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        try {
            const res = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputValue })
            });
            const newTodo = await res.json();
            setTodos([newTodo, ...todos]);
            setInputValue('');
        } catch (err) {
            console.error(err);
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed })
            });
            setTodos(todos.map(t => t.id === id ? { ...t, completed: !completed } : t));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'DELETE'
            });
            setTodos(todos.filter(t => t.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 transition-colors">
            <div className="max-w-xl mx-auto">
                <a href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-8 hover:underline font-medium">
                    <ArrowLeft size={20} /> Back to Portfolio
                </a>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
                    <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                        <h1 className="text-2xl font-bold text-white">Task Manager Demo</h1>
                        <p className="text-blue-100 mt-1">Full Stack Integration (MySQL + Express)</p>
                    </div>

                    <div className="p-6">
                        <form onSubmit={addTodo} className="flex gap-4 mb-8">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Add a new task..."
                                className="flex-1 px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                Add
                            </button>
                        </form>

                        <div className="space-y-3">
                            {todos.map(todo => (
                                <div
                                    key={todo.id}
                                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${todo.completed
                                            ? 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-75'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <button
                                            onClick={() => toggleTodo(todo.id, todo.completed)}
                                            className={`text-slate-400 hover:text-blue-500 transition-colors ${todo.completed ? 'text-green-500' : ''}`}
                                        >
                                            {todo.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                                        </button>
                                        <span className={`text-lg ${todo.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                            {todo.text}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                            {todos.length === 0 && (
                                <p className="text-center text-slate-500 py-4">No tasks yet. Add one above!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoDemo;
