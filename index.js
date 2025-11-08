// index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Rutas
const mainRouter       = require('./src/routes/main.routes');
const vehiculoPages    = require('./src/routes/vehiculo04.pages.router'); // vistas
const vehiculoApi      = require('./src/routes/vehiculo04.router');       // API JSON (opcional)

app.use('/', mainRouter);

// Acepta /vehiculos y /vehiculos04 por si el enunciado lo requiere
app.use(['/vehiculos', '/vehiculos04'], vehiculoPages);

// API JSON opcional
app.use('/api/vehiculos', vehiculoApi);

const port = Number(process.env.PORT || process.env.port || 3001);
app.listen(port, () => console.log(`http://localhost:${port}`));
