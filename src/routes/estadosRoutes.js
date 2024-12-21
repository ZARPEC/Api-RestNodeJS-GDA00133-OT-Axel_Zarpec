import express from 'express';
import {agregarEstado, mostrarEstados} from '../controllers/estadosController.js';

const router = express.Router();

router.post('/agregarEstado', agregarEstado);
router.get('/mostrarEstados', mostrarEstados);

export default router;

