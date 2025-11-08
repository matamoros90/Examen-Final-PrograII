const { Router } = require('express');
const V = require('../models/vehiculo04');
const router = Router();

// Listado
router.get('/', async (req, res) => {
  try {
    const vehiculos = await V.findAll();
    res.render('vehiculo04/index', { vehiculos });
  } catch (e) { res.status(500).send('Error listando: ' + e.message); }
});

// Form crear
router.get('/create', (req, res) => {
  res.render('vehiculo04/create');
});

// Crear
router.post('/', async (req, res) => {
  try {
    const { marca, modelo, precio, cantidad } = req.body;
    await V.create({ marca, modelo, precio, cantidad });
    res.redirect('/vehiculos');
  } catch (e) { res.status(500).send('Error creando: ' + e.message); }
});

// Detalle
router.get('/:id', async (req, res) => {
  try {
    const v = await V.findById(req.params.id);
    if (!v) return res.status(404).send('No encontrado');
    res.render('vehiculo04/show', { v });
  } catch (e) { res.status(500).send('Error obteniendo: ' + e.message); }
});

// Form editar
router.get('/:id/edit', async (req, res) => {
  try {
    const v = await V.findById(req.params.id);
    if (!v) return res.status(404).send('No encontrado');
    res.render('vehiculo04/edit', { v });
  } catch (e) { res.status(500).send('Error editando: ' + e.message); }
});

// Actualizar
router.put('/:id', async (req, res) => {
  try {
    await V.update(req.params.id, req.body);
    res.redirect('/vehiculos');
  } catch (e) { res.status(500).send('Error actualizando: ' + e.message); }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await V.removeById(req.params.id);
    res.redirect('/vehiculos');
  } catch (e) { res.status(500).send('Error eliminando: ' + e.message); }
});

module.exports = router;
