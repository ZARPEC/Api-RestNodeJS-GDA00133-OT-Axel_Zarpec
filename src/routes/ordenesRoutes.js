import express from 'express';
import {agregarOrden, mostrarOrdenes, modificarOrden, actualizarEstado, mostrarOrdenesPendientes} from '../controllers/ordenesController.js';

const router = express.Router();

router.post('/agregarOrden', agregarOrden);
router.get('/mostrarOrdenes', mostrarOrdenes);
router.get('/mostrarOrdenesPendientes', mostrarOrdenesPendientes);
router.post('/modificarOrden', modificarOrden);
router.post('/modificarEstadoOrden', actualizarEstado); 

export default router;