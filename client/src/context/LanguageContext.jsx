import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        nav: {
            home: 'Inicio',
            about: 'Sobre mí',
            skills: 'Habilidades',
            projects: 'Proyectos',
            contact: 'Contacto',
        },
        about: {
            paragraph1: 'Tengo 23 años y soy Tecnólogo en Análisis y Desarrollo de Software. Durante mi formación me enfoqué principalmente en el desarrollo de aplicaciones web, y actualmente sigo ampliando mis conocimientos de forma autónoma con tecnologías como Python.',
            paragraph2: 'Mi propósito es diseñar soluciones eficientes a problemas complejos en el ámbito web, así como también desarrollar aplicaciones de escritorio. Soy un profesional en constante aprendizaje, siempre buscando dominar nuevas herramientas y lenguajes de programación.',
            age: 'Edad',
            focus: 'Enfoque',
            focusText: 'Full Stack Web y Python',
            mindset: 'Mentalidad',
            mindsetText: 'Aprendizaje Continuo',
        },
        hero: {
            greeting: 'Hola, soy',
            role: 'Desarrollador Full Stack',
            subtitle: 'Tecnólogo en Desarrollo de Software',
            description: 'Transformando ideas en experiencias digitales con código limpio y diseño moderno.',
            cta: 'Ver Proyectos',
            cert: 'Ver Certificado',
        },
        projects: {
            preview: 'Vista previa del Proyecto',
            code: 'Código',
            demo: 'Demo en Vivo',
            showMore: 'Mostrar más',
            showLess: 'Mostrar menos',
        },
        contact: {
            getInTouch: 'Hablemos',
            description: 'Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tus visiones.',
            emailMe: 'Envíame un correo a',
            location: 'Ubicación',
            remote: 'Remoto / Mundial',
            name: 'Nombre',
            email: 'Correo Electrónico',
            message: 'Mensaje',
            placeholderName: 'Juan Pérez',
            placeholderMessage: 'Cuéntame sobre tu proyecto...',
            sending: 'Enviando...',
            sendButton: 'Enviar Mensaje',
            success: '¡Mensaje enviado con éxito!',
            error: 'Error al enviar. Por favor, inténtalo de nuevo.',
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact',
        },
        about: {
            paragraph1: 'I am 23 years old and a Software Analysis and Development Technologist. During my academic training, I focused primarily on web application development, and I am currently expanding my skill set autonomously with technologies like Python.',
            paragraph2: 'My goal is to design efficient solutions to complex problems in the web environment, as well as to develop desktop applications. I am a professional in constant learning, always looking to master new tools and programming languages.',
            age: 'Age',
            focus: 'Focus',
            focusText: 'Full Stack Web & Python',
            mindset: 'Mindset',
            mindsetText: 'Continuous Learning',
        },
        hero: {
            greeting: 'Hi, I am',
            role: 'Full Stack Developer',
            subtitle: 'Software Development Technologist',
            description: 'Transforming ideas into digital experiences with clean code and modern design.',
            cta: 'View Projects',
            cert: 'View Certificate',
        },
        projects: {
            preview: 'Project Preview',
            code: 'Code',
            demo: 'Live Demo',
            showMore: 'Show more',
            showLess: 'Show less',
        },
        contact: {
            getInTouch: 'Get in touch',
            description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
            emailMe: 'Email me at',
            location: 'Location',
            remote: 'Remote / Worldwide',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            placeholderName: 'John Doe',
            placeholderMessage: 'Tell me about your project...',
            sending: 'Sending...',
            sendButton: 'Send Message',
            success: 'Message sent successfully!',
            error: 'Failed to send. Please try again.',
        }
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
