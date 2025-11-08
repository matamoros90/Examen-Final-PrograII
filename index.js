// index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- Vistas ---------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

/* ---------- Rutas de páginas (EJS) ---------- */
app.use('/', require('./src/routes/main.routes'));
app.use('/vehiculos', require('./src/routes/vehiculo04.pages.router'));
app.use('/api/vehiculos', require('./src/routes/vehiculo04.router'));

/* ---------- (Opcional) Rutas API JSON ----------
   Se montan sólo si el archivo existe, para evitar MODULE_NOT_FOUND */
const safeUse = (mount, routerPath) => {
  try {
    app.use(mount, require(routerPath));
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.warn(`[skip] ${routerPath} no existe — omitiendo ${mount}`);
    } else {
      throw e;
    }
  }
};
safeUse('/api/vehiculos', './src/routes/vehiculo04.router'); // crea este archivo si quieres API
safeUse('/fisica', './src/routes/fisica.router');            // comenta si no lo usas
const port = process.env.PORT || process.env.port || 3001;
app.listen(port, () => console.log(`http://localhost:${port}`));


app.use((req, res) => res.status(404).send('Not Found'));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`http://localhost:${port}`));
