require('dotenv').config();
const mysql = require('mysql2/promise');

async function updateDummyText() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'portfolio_db'
        });

        console.log('Connected to MySQL. Updating dummy projects text...');

        const titleEs = 'Proyecto en Desarrollo';
        const titleEn = 'Project In Development';
        const descEs = 'Bajo construcción, vuelve más tarde. Aquí se está cocinando algo genial, pero aún no está listo.';
        const descEn = 'Under construction, come back later. Something awesome is cooking here, but it is not ready yet.';

        const [result] = await connection.query(
            "UPDATE projects SET title_es = ?, title_en = ?, description_es = ?, description_en = ? WHERE is_placeholder = TRUE",
            [titleEs, titleEn, descEs, descEn]
        );

        console.log(`Updated ${result.affectedRows} dummy projects with new text.`);

    } catch (error) {
        console.error('Update failed:', error);
    } finally {
        if (connection) await connection.end();
    }
}

updateDummyText();
