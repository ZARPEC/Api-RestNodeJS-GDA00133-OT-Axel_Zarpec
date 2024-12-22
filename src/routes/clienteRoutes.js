import express from 'express';
import {agregarCliente, modificarCliente, modificarEstadoCliente} from '../controllers/Clientes/clientesController.js';
import authenticateToken from '../../src/middleware/authMiddleware.js';

const router = express.Router();

router.post("/AgregarCliente",authenticateToken, agregarCliente);
router.post("/modificarCliente",authenticateToken, modificarCliente);
router.post("/modificarEstadoCliente",authenticateToken, modificarCliente);



export default router;