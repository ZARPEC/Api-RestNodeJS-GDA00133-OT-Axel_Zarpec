import express from 'express';
import {AgregarProducto,MostrarProductos} from '../controllers/Productos/productoController.js';
import authenticateToken from '../../src/middleware/authMiddleware.js';

const router = express.Router();

router.post("/AgregarProducto",authenticateToken, AgregarProducto);
router.get("/mostrarProductos", MostrarProductos);
export default router;