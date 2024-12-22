import express from 'express';
import {agregarEstado, mostrarEstados,modificarEstado} from '../controllers/estadosController.js';

const router = express.Router();

router.post('/agregarEstado', agregarEstado);
router.get('/mostrarEstados', mostrarEstados);
router.post('/modificarEstado', modificarEstado);

export default router;

