import express from 'express';
import {agregarRol, mostrarRoles,modificarRol} from '../controllers/rolController.js';

const router = express.Router();

router.post('/agregarRol', agregarRol);
router.get('/mostrarRoles', mostrarRoles);
router.post('/modificarRol', modificarRol);

export default router;