import express from 'express';
import {agregarRol, mostrarRoles} from '../controllers/rolController.js';

const router = express.Router();

router.post('/agregarRol', agregarRol);
router.get('/mostrarRoles', mostrarRoles);

export default router;