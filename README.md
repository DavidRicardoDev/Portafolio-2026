# David Peña - Full Stack Developer Portfolio

Bienvenido al repositorio de mi portafolio personal interactivo. Este proyecto no es solo una página de presentación estática, sino una aplicación web Full Stack completa construida para demostrar mis habilidades como desarrollador.

![Portfolio Preview](./client/public/vite.svg) <!-- Reemplazar con una captura de pantalla real del portafolio -->

## 🚀 Características Principales

*   **Aplicación Full Stack Real**: Integración completa entre Frontend (React) y Backend (Express + MySQL).
*   **Gestor de Tareas Integrado**: Incluye un "Live Demo" de una aplicación To-Do funcional para demostrar operaciones CRUD en tiempo real contra la base de datos.
*   **Soporte Multilingüe**: Cambio de idioma dinámico (Español / Inglés) usando React Context.
*   **Modo Oscuro/Claro**: Tema completamente adaptable (Dark/Light mode) con Tailwind CSS, guardado localmente para persistencia.
*   **Diseño Moderno y Responsivo**: Interfaz construida con Tailwind CSS, efectos *glassmorphism* e íconos de Lucide React.
*   **Formulario de Contacto Funcional**: Los mensajes se guardan directamente en la base de datos MySQL a través de la API REST.

## 🛠️ Tecnologías Utilizadas

**Frontend:**
*   React 18 + Vite
*   Tailwind CSS (Estilos y Modo Oscuro)
*   React Router DOM (Navegación para Demos)
*   Lucide React (Íconos)

**Backend:**
*   Node.js con Express
*   MySQL 2 (Base de datos)
*   CORS & Dotenv

## 📂 Estructura del Proyecto

El repositorio está dividido en dos partes principales:

*   `/client`: Contiene el código fuente de la aplicación React.
*   `/server`: Contiene la API REST de Express y los scripts de la base de datos.

## ⚙️ Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu máquina local.

### Prerrequisitos
*   Node.js instalado.
*   Servidor MySQL ejecutándose (ej. Laragon, XAMPP, o MySQL Workbench).

### Configuración del Backend (Servidor)

1. Abre una terminal y navega a la carpeta del servidor:
   ```bash
   cd server
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tus credenciales de base de datos en `server/.env` (si usas valores distintos a los por defecto, como contraseña `root`).
4. Inicializa la base de datos y llénala con los datos de prueba:
   ```bash
   node seed.js
   ```
5. Inicia el servidor:
   ```bash
   node index.js
   ```
   *(El servidor correrá en `http://localhost:3000`)*

### Configuración del Frontend (Cliente)

1. Abre una nueva terminal y navega a la carpeta del cliente:
   ```bash
   cd client
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
   *(La aplicación correrá en `http://localhost:5173`)*

## 🤝 Contacto

Puedes contactarme a través del formulario dentro del portafolio o enviando un correo a `contact.davidpenadev@gmail.com`.

---
*Desarrollado por David Peña - 2026*
