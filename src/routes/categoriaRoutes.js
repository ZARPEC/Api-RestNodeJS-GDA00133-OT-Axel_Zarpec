import express from 'express';
import {AgregarCategoria,mostrarCategoriasModel} from '../controllers/Categorias/categoriaController.js';

const router = express.Router();

router.post("/AgregarCategoria", AgregarCategoria);
router.get("/mostrarCategorias", mostrarCategoriasModel);

export default router;