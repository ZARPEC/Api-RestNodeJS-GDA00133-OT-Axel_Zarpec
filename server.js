import express from 'express';
import bodyParser from 'body-parser';
import categoriaRoutes from './src/routes/categoriaRoutes.js';
import productoRoutes from './src/routes/productoRoutes.js';
import clienteRoutes from './src/routes/clienteRoutes.js';
import ordenesRoutes from './src/routes/ordenesRoutes.js';



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;
//Operaciones con categorias y subcategorias
app.use('/categoria', categoriaRoutes);
//Operaciones con productos
app.use('/producto', productoRoutes);
//operaciones con clientes
app.use('/cliente', clienteRoutes);
//Operaciones con detalles y ordenes

app.use('/ordenes', ordenesRoutes);




app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });