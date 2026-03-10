require('dotenv').config();
const mysql = require('mysql2/promise');

async function migrateSkills() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'portfolio_db'
        });

        console.log('Connected to MySQL. Altering skills table...');

        // Ignore error if columns already exist
        try {
            await connection.query('ALTER TABLE skills ADD COLUMN description_es TEXT, ADD COLUMN description_en TEXT');
            console.log('Columns added.');
        } catch (e) {
            console.log('Columns likely exist already or error:', e.message);
        }

        const updates = [
            { name: 'React', es: 'Creación de interfaces web interactivas y escalables con componentes reutilizables.', en: 'Building interactive and scalable web interfaces with reusable components.' },
            { name: 'Tailwind CSS', es: 'Diseño responsivo y moderno aplicando estilos eficientemente mediante clases utilitarias.', en: 'Modern and responsive design through efficient utility-first styling.' },
            { name: 'Node.js', es: 'Desarrollo de APIs RESTful y servicios backend rápidos y escalables.', en: 'Developing fast and scalable RESTful APIs and backend services.' },
            { name: 'MySQL', es: 'Diseño y optimización de bases de datos relacionales robustas para la persistencia de datos seguros.', en: 'Design and optimization of robust relational databases for secure data persistence.' },
            { name: 'Python', es: 'Desarrollo de aplicaciones de escritorio y automatización de procesos mediante scripting.', en: 'Desktop application development and process automation through scripting.' }
        ];

        for (const update of updates) {
            await connection.query(
                'UPDATE skills SET description_es = ?, description_en = ? WHERE name = ?',
                [update.es, update.en, update.name]
            );
        }

        console.log('Skills descriptions updated.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        if (connection) await connection.end();
    }
}

migrateSkills();
