import express from 'express';
import bodyParser from 'body-parser';
import categoriaRoutes from './src/routes/categoriaRoutes.js';



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;
//Operaciones con categorias y subcategorias
app.use('/categoria', categoriaRoutes);



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
