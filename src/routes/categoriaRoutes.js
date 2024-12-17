import express from 'express';
import {AgregarCategoria,mostrarCategoriasModel,AgregarSubCategoria,pruebaGet,MostrarSubCategorias} from '../controllers/Categorias/categoriaController.js';

const router = express.Router();
//categorias
router.post("/AgregarCategoria", AgregarCategoria);
router.get("/mostrarCategorias", mostrarCategoriasModel);

//subcategorias

router.post("/agregarSubCategoria", AgregarSubCategoria);
router.get("/mostrarSubCategorias", MostrarSubCategorias);

router.get("/pruebaGet", pruebaGet);

export default router;