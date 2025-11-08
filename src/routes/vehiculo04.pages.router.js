const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculo04');

router.get('/', async (_req, res) => {
  const vehiculos = await Vehiculo.findAll();
  res.render('vehiculo/index', { vehiculos });
});

router.get('/create', (_req, res) => res.render('vehiculo/create'));

router.post('/', async (req, res) => {
  const { marca, modelo, precio, cantidad } = req.body;
  await Vehiculo.create({ marca, modelo, precio, cantidad });
  res.redirect('/vehiculos');
});

router.get('/:id', async (req, res) => {
  const v = await Vehiculo.findById(req.params.id);
  if (!v) return res.redirect('/vehiculos');
  res.render('vehiculo/show', { v });
});

router.get('/:id/edit', async (req, res) => {
  const v = await Vehiculo.findById(req.params.id);
  if (!v) return res.redirect('/vehiculos');
  res.render('vehiculo/edit', { v });
});

router.put('/:id', async (req, res) => {
  const { marca, modelo, precio, cantidad } = req.body;
  await Vehiculo.update(req.params.id, { marca, modelo, precio, cantidad });
  res.redirect('/vehiculos');
});

router.delete('/:id', async (req, res) => {
  await Vehiculo.removeById(req.params.id);
  res.redirect('/vehiculos');
});

module.exports = router;
