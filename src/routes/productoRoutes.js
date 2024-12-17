import express from 'express';
import {AgregarProducto,mostrarProductosModel} from '../controllers/Productos/productoController.js';

const router = express.Router();

router.post("/AgregarProducto", AgregarProducto);
router.get("/mostrarProductos", mostrarProductosModel);

export default router;