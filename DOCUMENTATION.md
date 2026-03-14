# David Peña - Portfolio V1.0 - Full Technical Documentation

## 1. Arquitectura del Proyecto

Este portafolio no es solo una página estática, es una **Aplicación Web Full Stack (SPA + API + DB Relacional)** diseñada para ser escalable, segura y bilingüe.

Se divide en 3 capas fundamentales que operan en diferentes plataformas de la nube:

1.  **Frontend (El Cliente - React/Vite)**
    *   **Responsabilidad:** Renderizar la interfaz visual, manejar el estado global (Idioma, Modo Oscuro, Autenticación de UI) y hacer peticiones al servidor remoto.
    *   **Hospedaje:** Vercel (Gratuito, siempre encendido, Edge Network).
    *   **Librerías Clave:** `react-router-dom` (Navegación sin recargar página), `framer-motion` (Animaciones 60fps), `lucide-react` (Iconografía vectorial ligera).

2.  **Backend (El Servidor - Node.js/Express)**
    *   **Responsabilidad:** Proveer de endpoints seguros para conectar el código React con la base de datos de manera protegida.
    *   **Hospedaje:** Render.com (Gratuito, se "duerme" si no detecta tráfico luego de 15 minutos).
    *   **Librerías Clave:** `jsonwebtokens` (Seguridad de sesión Admin), `cors` (Gestión de permisos de dominio), `mysql2` (Manejo asíncrono de base de datos).

3.  **Base de Datos (Almacenamiento - MySQL)**
    *   **Responsabilidad:** Persistencia de Proyectos, Habilidades, Tareas de Demo y Mensajes de Contacto.
    *   **Hospedaje:** Aiven (Plan Hobbyist gratuito. Requiere certificado SSL activo forzado desde el servidor).

---

## 2. Guía de Operaciones Diarias

### Panel de Administración Mágico
Toda gestión del portafolio se hace desde una interfaz gráfica (No tienes que tocar código jamás para agregar portafolios nuevos).

1.  Navega a: `https://[tu-enlace-vercel]/login`
2.  Ingresa tu `ADMIN_PASSWORD` (La misma que configuraste en las variables de entorno de Render).
3.  Una vez verificado con JWT (JSON Web Token), podrás:
    *   **Añadir un Proyecto Externo**: Coloca toda su info, y en la "URL del Demo", pega el enlace hacia GitHub Pages o la web donde vivan tus proyectos futuros (EJ: Python).
    *   **Añadir un Proyecto Interno (Demos)**: Como el Task Manager, sube su información y en la "URL del Demo" coloca la ruta interna (ej. `/demos/todo`). React navegará ahí sin sacar al usuario de tu portafolio.

### Gestión de Nube y Tiempos de Carga
Dado que usamos un modelo de arquitectura de nivel 0 costo ($0), hay dos comportamientos normales:

-   **El "Cold Start" de Render:** Tu servidor backend "duerme" para ahorrar recursos a la empresa Render si nadie ha visitado el portafolio. Cuando la primera persona del día (ej. un reclutador) entre a ver tus proyectos, notará que **tardan unos 30-50 segundos** en cargar en pantalla. No desistas, una vez el servidor despierte, se queda encendido para funcionar rápida y perfectamente para ese usuario.
-   **Aiven Database:** Aiven es fantástico pero debes estar atento a los correos que te manden; ocasionalmente piden que inicies sesión en tu portal de Aiven.io para verificar que tu cuenta sigue "activa", o podrían pausar el servicio. Esto pasa aprox. 1 vez al mes.

---

## 3. Guía de Variables de Entorno (Environment Variables)

Para que el proyecto exista en cualquier computadora o en la nube, necesita "Cartas selladas" que nadie más deba leer (Ni siquiera el repositorio de GitHub).

### Backend (`server/.env` o Variables Avanzadas en Render)
-   `DB_HOST` = (Host URI proporcionado por Aiven.io)
-   `DB_PORT` = 25398 (Varía según clúster)
-   `DB_USER` = avnadmin
-   `DB_PASS` = (Secreto de Aiven)
-   `DB_NAME` = defaultdb
-   `ADMIN_PASSWORD` = (Tu contraseña para acceder al Dashboard)
-   `JWT_SECRET` = (Firma matemática irrepetible para asegurar las sesiones contra hackers).

### Frontend (En el panel de Vercel)
-   `VITE_API_URL` = `https://portfolio-api-2k11.onrender.com` (Usa localhost en desarrollo local).

---

## 4. Estructura de Base de Datos

Cuenta con 4 tablas robustas creadas mediante la instrucción SQL maestra:

*   **`projects`**: Datos bilingües de apps desarrolladas, banderas booleanas (`is_placeholder`), URLs locales/externos.
*   **`skills`**: Relación con iconos vectores (Lucide-React) categorizados.
*   **`messages`**: Backups seguros procedentes del componente `<Contact />`.
*   **`todos`**: Tabla demostrativa para la Mini-Aplicación de gestión de tareas que evidencia capacidad Full Stack en tiempo real.
