import express from 'express';
import {AgregarProducto,MostrarProductos, modificarProducto, modificarEstadoProducto, MostrarProductosInactivos} from '../controllers/Productos/productoController.js';
import authenticateToken from '../../src/middleware/authMiddleware.js';

const router = express.Router();

router.post("/AgregarProducto",authenticateToken, AgregarProducto);
router.get("/mostrarProductos", MostrarProductos);
router.post("/modificarProducto",authenticateToken, modificarProducto);
router.get("/mostrarProductosInactivos", MostrarProductosInactivos);
router.post("/modificarEstadoProducto",authenticateToken, modificarEstadoProducto);

export default router;