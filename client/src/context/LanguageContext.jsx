import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        nav: {
            home: 'Inicio',
            skills: 'Habilidades',
            projects: 'Proyectos',
            contact: 'Contacto',
        },
        hero: {
            greeting: 'Hola, soy',
            role: 'Desarrollador Full Stack',
            description: 'Transformando ideas en experiencias digitales con código limpio y diseño moderno.',
            cta: 'Ver Proyectos',
        },
    },
    en: {
        nav: {
            home: 'Home',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact',
        },
        hero: {
            greeting: 'Hi, I am',
            role: 'Full Stack Developer',
            description: 'Transforming ideas into digital experiences with clean code and modern design.',
            cta: 'View Projects',
        },
    },
};

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es');

    const t = (path) => {
        const keys = path.split('.');
        let current = translations[language];
        for (const key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }
        return current;
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
