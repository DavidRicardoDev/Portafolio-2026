import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { API_URL } from '../config';

const Contact = () => {
    const { t } = useLanguage();
    const form = useRef();
    const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // First, save to our database (Optional, but good for backup)
            await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.user_name,
                    email: formData.user_email,
                    message: formData.message
                }),
            }).catch(() => { });

            // Then, send email via EmailJS
            await emailjs.sendForm(
                'service_8xn7a13',
                'template_4c7xrze',
                form.current,
                'D-bZN2fw5FYU1OKNr'
            );

            setStatus('success');
            setFormData({ user_name: '', user_email: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white inline-block relative">
                        {t('nav.contact')}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    </h2>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 overflow-hidden">
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/3 space-y-8"
                    >
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('contact.getInTouch')}</h3>
                        <p className="text-slate-600 dark:text-slate-300">
                            {t('contact.description')}
                        </p>

                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <Mail className="text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">{t('contact.emailMe')}</p>
                                <p className="font-medium">contact.davidpenadev@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <MapPin className="text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">{t('contact.location')}</p>
                                <p className="font-medium">{t('contact.remote')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        ref={form} onSubmit={handleSubmit} className="md:w-2/3 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800"
                    >
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.name')}</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none transition-all"
                                    placeholder={t('contact.placeholderName')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.email')}</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    value={formData.user_email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none transition-all"
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.message')}</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none transition-all resize-none"
                                placeholder={t('contact.placeholderMessage')}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? t('contact.sending') : (
                                <>{t('contact.sendButton')} <Send size={20} /></>
                            )}
                        </button>

                        {status === 'success' && (
                            <p className="mt-4 text-green-600 text-center font-medium animate-fade-in">{t('contact.success')}</p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-red-600 text-center font-medium animate-fade-in">{t('contact.error')}</p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
