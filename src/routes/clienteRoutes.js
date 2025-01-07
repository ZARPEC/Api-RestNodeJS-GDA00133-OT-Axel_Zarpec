import express from 'express';
import {agregarCliente, modificarCliente, modificarEstadoCliente, mostrarClientes} from '../controllers/Clientes/clientesController.js';
import authenticateToken from '../../src/middleware/authMiddleware.js';

const router = express.Router();

router.post("/AgregarCliente",authenticateToken, agregarCliente);
router.get("/mostrarClientes",authenticateToken, mostrarClientes);
router.post("/modificarCliente",authenticateToken, modificarCliente);
router.post("/modificarEstadoCliente",authenticateToken, modificarEstadoCliente);



export default router;