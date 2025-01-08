import express from 'express';
import { MostrarUnidadMedida } from '../controllers/UnidadMedida.js';

const router = express.Router();

router.get('/mostrarUnidadMedida', MostrarUnidadMedida);

export default router;

