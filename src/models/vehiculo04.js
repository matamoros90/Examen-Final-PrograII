const { pool } = require('./mysql');
const TABLE = 'vehiculo04'; // 👈 como está en tu BD

const C = {
  ID: 'ID_VEHICULO_04',
  MARCA: 'MARCA_04',
  MODELO: 'MODELO_04',
  PRECIO: 'PRECIO_04',
  CANT: 'CANTIDAD_04'
};

async function findAll() {
  const [rows] = await pool.query(
    `SELECT ${C.ID} id, ${C.MARCA} marca, ${C.MODELO} modelo,
            ${C.PRECIO} precio, ${C.CANT} cantidad
     FROM ${TABLE}`
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    `SELECT ${C.ID} id, ${C.MARCA} marca, ${C.MODELO} modelo,
            ${C.PRECIO} precio, ${C.CANT} cantidad
     FROM ${TABLE} WHERE ${C.ID}=?`, [id]
  );
  return rows[0] || null;
}

async function create({ marca, modelo, precio, cantidad }) {
  const [r] = await pool.query(
    `INSERT INTO ${TABLE} (${C.MARCA},${C.MODELO},${C.PRECIO},${C.CANT})
     VALUES (?,?,?,?)`, [marca, modelo, precio, cantidad]
  );
  return findById(r.insertId);
}

async function update(id, { marca, modelo, precio, cantidad }) {
  await pool.query(
    `UPDATE ${TABLE} SET ${C.MARCA}=?, ${C.MODELO}=?, ${C.PRECIO}=?, ${C.CANT}=?
     WHERE ${C.ID}=?`,
    [marca, modelo, precio, cantidad, id]
  );
  return findById(id);
}

async function removeById(id) {
  const [r] = await pool.query(`DELETE FROM ${TABLE} WHERE ${C.ID}=?`, [id]);
  return r.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, removeById };
