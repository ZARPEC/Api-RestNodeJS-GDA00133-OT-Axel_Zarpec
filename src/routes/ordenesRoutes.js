import express from 'express';
import {agregarOrden, mostrarOrdenes} from '../controllers/ordenesController.js';

const router = express.Router();

router.post('/agregarOrden', agregarOrden);
router.get('/mostrarOrdenes', mostrarOrdenes);

export default router;