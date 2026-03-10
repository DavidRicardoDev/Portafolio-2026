# David Peña - Full Stack Developer Portfolio 🚀

¡Bienvenido a mi portafolio profesional! Este proyecto es una aplicación Full Stack moderna diseñada para mostrar mis habilidades técnicas, proyectos realizados y mi trayectoria como Tecnólogo en Desarrollo de Software.

## ✨ Características Principales

- **🎨 Diseño Moderno & Premium**: Interfaz fluida con animaciones suaves, modo oscuro/claro y efectos de gradiente corporativos.
- **🌍 Totalmente Bilingüe**: Soporte completo para Español e Inglés con persistencia de idioma mediante React Context.
- **📱 Responsivo & Táctil**: Optimizado para dispositivos móviles con interacciones adaptadas específicamente para pantallas táctiles (como tooltips expandibles).
- **🛠️ Stack Tecnológico Real**: Integración de Frontend (React + Vite) con Backend (Node.js + Express) y base de datos relacional (MySQL).
- **📧 Formulario de Contacto Pro**: Envío de correos directos mediante EmailJS con respaldo automático en base de datos local para redundancia.
- **🚀 Demo Integrada**: Incluye un Gestor de Tareas Full Stack funcional para demostrar operaciones CRUD en tiempo real.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** (Diseño y Estilos)
- **Lucide React** (Iconografía moderna)
- **EmailJS** (Servicio Mensajería a través de API)

### Backend
- **Node.js & Express**
- **MySQL2** (Gestión de base de datos robusta)
- **CORS & Dotenv** (Seguridad y configuración de entorno)

## 📦 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/portfolio-2026.git
cd portfolio-2026
```

### 2. Configuración del Servidor (Backend)
```bash
cd server
npm install
```
Crea un archivo `.env` en la carpeta `server` con tus credenciales:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña
DB_NAME=portfolio_db
```
Importa el contenido de `schema.sql` en tu MySQL para generar las tablas.

### 3. Configuración del Cliente (Frontend)
```bash
cd ../client
npm install
npm run dev
```

## 📂 Estructura del Proyecto

```text
├── client/          # Aplicación React
│   ├── src/
│   │   ├── components/  # Bloques de construcción (Hero, About, Projects, etc.)
│   │   ├── context/     # Proveedores de estado (Idioma y Tema)
│   │   └── App.jsx      # Rutas y vista principal
├── server/          # API REST Node.js
│   ├── index.js     # Desarrollo de Endpoints y Middleware
│   ├── db.js        # Enlace a base de datos
│   └── schema.sql   # Blueprint de la base de datos
```

## 👤 David Peña

Soy David Peña, Tecnólogo en Análisis y Desarrollo de Software apasionado por crear soluciones digitales que combinen estética y funcionalidad. Actualmente exploro las fronteras del desarrollo bilingüe y aplicaciones de alto rendimiento.

---
*Desarrollado con ❤️ para el Portafolio David Peña - 2026*
