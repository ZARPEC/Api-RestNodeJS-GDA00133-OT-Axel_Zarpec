import express from 'express';
import {agregarOrden, mostrarOrdenes, modificarOrden, actualizarEstado} from '../controllers/ordenesController.js';

const router = express.Router();

router.post('/agregarOrden', agregarOrden);
router.get('/mostrarOrdenes', mostrarOrdenes);
router.post('/modificarOrden', modificarOrden);
router.post('/modificarEstadoOrden', actualizarEstado); 


export default router;