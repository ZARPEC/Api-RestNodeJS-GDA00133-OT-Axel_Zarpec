import express from 'express';
import {agregarCliente} from '../controllers/Clientes/clientesController.js';
import authenticateToken from '../../src/middleware/authMiddleware.js';

const router = express.Router();

router.post("/AgregarCliente",authenticateToken, agregarCliente);


export default router;