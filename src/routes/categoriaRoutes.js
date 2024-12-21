import express from 'express';
import {AgregarCategoria,mostrarCategoriasModel,AgregarSubCategoria,pruebaGet,MostrarSubCategorias} from '../controllers/Categorias/categoriaController.js';
import authenticateToken from '../../src/middleware/authMiddleware.js';

const router = express.Router();
//categorias
router.post("/AgregarCategoria",authenticateToken, AgregarCategoria);
router.get("/mostrarCategorias", mostrarCategoriasModel);

//subcategorias

router.post("/agregarSubCategoria",authenticateToken, AgregarSubCategoria);
router.get("/mostrarSubCategorias", MostrarSubCategorias);

router.get("/pruebaGet", pruebaGet);

export default router;