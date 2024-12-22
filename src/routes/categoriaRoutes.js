import express from 'express';
import {AgregarCategoria,mostrarCategorias,modificarCategoria,AgregarSubCategoria,pruebaGet,MostrarSubCategorias, modificarSubCategoria} from '../controllers/Categorias/categoriaController.js';
import authenticateToken from '../../src/middleware/authMiddleware.js';

const router = express.Router();
//categorias
router.post("/AgregarCategoria",authenticateToken, AgregarCategoria);
router.get("/mostrarCategorias", mostrarCategorias);
router.post("/modificarCategoria",authenticateToken, modificarCategoria);

//subcategorias

router.post("/agregarSubCategoria",authenticateToken, AgregarSubCategoria);
router.get("/mostrarSubCategorias", MostrarSubCategorias);
router.post("/modificarSubCategoria",authenticateToken, modificarSubCategoria);



router.get("/pruebaGet", pruebaGet);

export default router;