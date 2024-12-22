import express from 'express';
import {agregarCliente, modificarCliente} from '../controllers/Clientes/clientesController.js';
import authenticateToken from '../../src/middleware/authMiddleware.js';

const router = express.Router();

router.post("/AgregarCliente",authenticateToken, agregarCliente);
router.post("/modificarCliente",authenticateToken, modificarCliente);


export default router;