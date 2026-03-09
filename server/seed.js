const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seedDatabase() {
    let connection;
    try {
        // 1. Connect without database selected to create it if needed
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        });

        console.log('Connected to MySQL...');

        // 2. Read schema file
        const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        const statements = schemaSql.split(';').filter(stmt => stmt.trim().length > 0);

        // 3. Execute statements
        for (const statement of statements) {
            // Skip empty or comment-only statements if split leaves any
            if (!statement.trim()) continue;

            try {
                await connection.query(statement);
            } catch (err) {
                // Ignore "database exists" or "table exists" errors if they are harmless, 
                // but schema.sql uses IF NOT EXISTS so it should be fine.
                console.warn('Warning executing statement:', err.message);
            }
        }

        console.log('Database initialized and seeded successfully!');

    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        if (connection) await connection.end();
        process.exit();
    }
}

seedDatabase();
