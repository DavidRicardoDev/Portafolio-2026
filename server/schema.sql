CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_es VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_es TEXT,
    description_en TEXT,
    image_url VARCHAR(255),
    technologies JSON,
    repo_url VARCHAR(255),
    demo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category ENUM('frontend', 'backend', 'tools', 'soft') NOT NULL,
    icon_class VARCHAR(50),
    description_es TEXT,
    description_en TEXT
);

-- Messages Table (Contact Form)
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Todos Table (For Task Manager Demo)
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data
INSERT IGNORE INTO skills (name, category, icon_class, description_es, description_en) VALUES 
('React', 'frontend', 'react', 'Creación de interfaces web interactivas y escalables con componentes reutilizables.', 'Building interactive and scalable web interfaces with reusable components.'),
('Tailwind CSS', 'frontend', 'palette', 'Diseño responsivo y moderno aplicando estilos eficientemente mediante clases utilitarias.', 'Modern and responsive design through efficient utility-first styling.'),
('Node.js', 'backend', 'server', 'Desarrollo de APIs RESTful y servicios backend rápidos y escalables.', 'Developing fast and scalable RESTful APIs and backend services.'),
('MySQL', 'backend', 'database', 'Diseño de esquemas y gestión de bases de datos relacionales robustas.', 'Database schema design and management of robust relational databases.'),
('Python', 'backend', 'python', 'Desarrollo de aplicaciones de escritorio, scripting avanzado y soluciones backend.', 'Desktop application development, advanced scripting, and backend solutions.');

INSERT INTO projects (title_es, title_en, description_es, description_en, technologies, repo_url, demo_url) 
SELECT 'Gestor de Tareas Full Stack', 'Full Stack Task Manager', 'Aplicación de lista de tareas completamente funcional con base de datos MySQL.', 'Fully functional To-Do list application powered by MySQL database.', '["React", "Express", "MySQL"]', 'https://github.com/davidpena/portfolio', '/demos/todo'
WHERE NOT EXISTS (SELECT * FROM projects WHERE title_en = 'Full Stack Task Manager');
