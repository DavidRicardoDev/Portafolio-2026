import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, Mail, MapPin } from 'lucide-react';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800 dark:text-white">
                    {t('nav.contact')}
                </h2>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Contact Info */}
                    <div className="md:w-1/3 space-y-8">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get in touch</h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <Mail className="text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Email me at</p>
                                <p className="font-medium">contact@davidpena.dev</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <MapPin className="text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Location</p>
                                <p className="font-medium">Remote / Worldwide</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="md:w-2/3 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white outline-none transition-all resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? 'Sending...' : (
                                <>Send Message <Send size={20} /></>
                            )}
                        </button>

                        {status === 'success' && (
                            <p className="mt-4 text-green-600 text-center font-medium animate-fade-in">Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-red-600 text-center font-medium animate-fade-in">Failed to send. Please try again.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
