import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categoriaRoutes from './src/routes/categoriaRoutes.js';
import productoRoutes from './src/routes/productoRoutes.js';
import clienteRoutes from './src/routes/clienteRoutes.js';
import ordenesRoutes from './src/routes/ordenesRoutes.js';
import usuarioRoutes from './src/routes/usuariosRoutes.js';
import estadoRoutes from './src/routes/estadosRoutes.js';
import rolesRoutes from './src/routes/rolRoutes.js';
import authenticateToken from './src/middleware/authMiddleware.js';



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3005;
//Operaciones con categorias y subcategorias
app.use('/categoria', categoriaRoutes);
//Operaciones con productos
app.use('/producto', productoRoutes);
//operaciones con clientes
app.use('/cliente', clienteRoutes);
//Operaciones con detalles y ordenes
app.use('/ordenes',authenticateToken, ordenesRoutes);
//operaciones con usuarios
app.use('/usuario', usuarioRoutes);
//operaciones con estados
app.use('/estado',authenticateToken, estadoRoutes);
//operaciones con roles
app.use('/roles',authenticateToken, rolesRoutes);

app.listen(port,'0.0.0.0', () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });