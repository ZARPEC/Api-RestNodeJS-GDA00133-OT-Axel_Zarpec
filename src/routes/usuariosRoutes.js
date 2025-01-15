import express from "express";
import {
  Login,
  agregarUsuario,
  ModificarUsuario,
} from "../controllers/usuariosController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", Login);
router.post("/agregarUsuario", authenticateToken, agregarUsuario); // usuarios sin cliente
router.post("/modificarUsuario", authenticateToken, ModificarUsuario);

export default router;
