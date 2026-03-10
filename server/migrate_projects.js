require('dotenv').config();
const mysql = require('mysql2/promise');

async function migrateProjects() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'portfolio_db'
        });

        console.log('Connected to MySQL. Altering projects table...');

        try {
            await connection.query("ALTER TABLE projects ADD COLUMN status ENUM('completed', 'construction') DEFAULT 'completed'");
            await connection.query("ALTER TABLE projects ADD COLUMN is_placeholder BOOLEAN DEFAULT FALSE");
            console.log('Columns added successfully.');
        } catch (e) {
            console.log('Columns likely exist already or error:', e.message);
        }

        // Update existing dummy projects to be placeholders under construction
        // "Gestor de Tareas Full Stack" is a real project, so we want everything ELSE to be dummy
        console.log('Updating dummy projects...');
        const [result] = await connection.query(
            "UPDATE projects SET is_placeholder = TRUE, status = 'construction' WHERE title_en != 'Full Stack Task Manager'"
        );

        console.log(`Updated ${result.affectedRows} dummy projects.`);
        console.log('Migration completed successfully.');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        if (connection) await connection.end();
    }
}

migrateProjects();
