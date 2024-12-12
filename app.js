const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ejsLocals = require('ejs-locals');
const connectDB = require('./config/db');
const http = require('http');
const logger = require('morgan');
const { Server } = require('socket.io');


dotenv.config();
const app = express();

// Configurar CORS
const corsOptions = {
    origin: '*',
    methods: ['*'],
    allowedHeaders: ['*'],
    // allowedHeaders: ['Content-Type'],
};

// Crear servidor HTTP
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// socketRoutes(io);
connectDB();


// Configuración de Express
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsLocals);
app.set('view engine', 'ejs');
app.set('views', './src/resources/views');
app.use(express.static('./src/resources/views'));

// Rutas de la API y Web
const apiRoutes = require('./src/routes/api');
const webRoutes = require('./src/routes/web');
app.use(logger('dev'));
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message, archivo: err.stack });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/src/resources/views/auth/login.html');
  });
  

// Iniciar servidor HTTP
if (require.main === module) {
    //const PORT = process.env.PORT || 80;
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Servidor corriendo en http://http://localhost:${PORT}`);
        //console.log(`Servidor corriendo en http://192.168.1.47:${PORT}`);
    });
}
module.exports = app;
