import mysql from "mysql2/promise"
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_PASSWORD ? {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    } : null,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;