import express from 'express';
import jwt from 'jsonwebtoken';
//import authenticateToken from '../middleware/authMiddleware.js';
import {Login} from '../controllers/usuariosController.js';


const router = express.Router();

router.post('/login', Login);

export default router;

