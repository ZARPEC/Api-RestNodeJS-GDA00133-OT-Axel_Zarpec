import express from 'express';
import {agregarOrden } from '../controllers/ordenesController.js';

const router = express.Router();

router.post('/agregarOrden', agregarOrden);

export default router;