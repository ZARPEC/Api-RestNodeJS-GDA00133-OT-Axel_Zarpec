import express from 'express';
import {agregarOrden, mostrarOrdenes, modificarOrden} from '../controllers/ordenesController.js';

const router = express.Router();

router.post('/agregarOrden', agregarOrden);
router.get('/mostrarOrdenes', mostrarOrdenes);
router.post('/modificarOrden', modificarOrden);
router.get('/modificarEstadoOrden', modificarOrden); 

export default router;