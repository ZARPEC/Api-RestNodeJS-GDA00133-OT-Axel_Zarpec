import express from 'express';
import {AgregarProducto,MostrarProductos} from '../controllers/Productos/productoController.js';

const router = express.Router();

router.post("/AgregarProducto", AgregarProducto);
router.get("/mostrarProductos", MostrarProductos);
export default router;