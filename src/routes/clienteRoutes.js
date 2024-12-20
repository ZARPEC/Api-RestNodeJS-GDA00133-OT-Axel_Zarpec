import express from 'express';
import {agregarCliente} from '../controllers/Clientes/clientesController.js';

const router = express.Router();

router.post("/AgregarCliente", agregarCliente);

export default router;