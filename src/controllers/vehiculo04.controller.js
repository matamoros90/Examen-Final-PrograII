const V = require('../models/vehiculo04');

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await V.findAll();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: 'Error listando', detail: e.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const v = await V.findById(req.params.id);
      if (!v) return res.status(404).json({ error: 'No encontrado' });
      res.json(v);
    } catch (e) {
      res.status(500).json({ error: 'Error obteniendo', detail: e.message });
    }
  },

  create: async (req, res) => {
    try {
      const { marca, modelo, precio, cantidad } = req.body;
      if (!marca || !modelo || precio == null || cantidad == null) {
        return res.status(400).json({ error: 'marca, modelo, precio, cantidad son requeridos' });
      }
      const r = await V.create({ marca, modelo, precio, cantidad });
      res.status(201).json({ ok: true, id: r.id });
    } catch (e) {
      res.status(500).json({ error: 'Error creando', detail: e.message });
    }
  },

  update: async (req, res) => {
    try {
      const ok = await V.update(req.params.id, req.body);
      if (!ok) return res.status(404).json({ error: 'No encontrado' });
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: 'Error actualizando', detail: e.message });
    }
  },

  remove: async (req, res) => {
    try {
      const ok = await V.removeById(req.params.id);
      if (!ok) return res.status(404).json({ error: 'No encontrado' });
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: 'Error eliminando', detail: e.message });
    }
  }
};
