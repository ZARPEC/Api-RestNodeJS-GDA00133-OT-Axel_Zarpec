import express from 'express';
import jwt from 'jsonwebtoken';
//import authenticateToken from '../middleware/authMiddleware.js';
import {Login,agregarUsuario,ModificarUsuario} from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/login', Login);
router.post('/agregarUsuario', agregarUsuario);// usuarios sin cliente
router.post('/modificarUsuario',ModificarUsuario);

export default router;

