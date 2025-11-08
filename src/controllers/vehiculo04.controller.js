const Vehiculo = require('../models/vehiculo04');

module.exports.getAll = async (req, res) => {
  try { res.json(await Vehiculo.findAll()); }
  catch (e) { res.status(500).json({ error: 'Error listando', detail: e.message }); }
};

module.exports.getOne = async (req, res) => {
  try {
    const x = await Vehiculo.findById(req.params.id);
    if (!x) return res.status(404).json({ error: 'No encontrado' });
    res.json(x);
  } catch (e) { res.status(500).json({ error: 'Error obteniendo', detail: e.message }); }
};

module.exports.create = async (req, res) => {
  try {
    const { marca, modelo, precio, cantidad } = req.body;
    if (!marca || !modelo || precio == null || cantidad == null)
      return res.status(400).json({ error: 'marca, modelo, precio, cantidad son requeridos' });
    const x = await Vehiculo.create({ marca, modelo, precio, cantidad });
    res.status(201).json(x);
  } catch (e) { res.status(500).json({ error: 'Error creando', detail: e.message }); }
};

module.exports.update = async (req, res) => {
  try {
    const { marca, modelo, precio, cantidad } = req.body;
    const x = await Vehiculo.update(req.params.id, { marca, modelo, precio, cantidad });
    if (!x) return res.status(404).json({ error: 'No encontrado' });
    res.json(x);
  } catch (e) { res.status(500).json({ error: 'Error actualizando', detail: e.message }); }
};

module.exports.remove = async (req, res) => {
  try {
    const ok = await Vehiculo.removeById(req.params.id);
    if (!ok) return res.status(404).json({ error: 'No encontrado' });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: 'Error eliminando', detail: e.message }); }
};
