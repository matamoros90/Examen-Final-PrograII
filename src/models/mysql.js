// src/models/mysql.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Diagnóstico simple al iniciar
(async () => {
  try {
    const [r1] = await pool.query('SELECT DATABASE() AS db');
    console.log('✅ Conectado a BD:', r1[0].db);
    const [r2] = await pool.query('SHOW TABLES');
    console.log('🟤 Tablas visibles:', r2.map(x => Object.values(x)[0]));
  } catch (e) {
    console.error('❌ Error BD:', e.message);
  }
})();

module.exports = pool;
