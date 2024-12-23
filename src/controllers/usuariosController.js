import {
  LoginModel,
  agregarUsuarioModel,
  modificarUsuarioModel,
} from "../models/usuarioModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function Login(req, res) {
  try {
    const { nombreUsuario, pass } = req.body;
    const user = await LoginModel(nombreUsuario);
    if (user.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const validPass = await bcrypt.compare(pass, user[0].password);
    if (!validPass) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: user[0].idUsuario, rol: user[0].rol_fk },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    console.log(token);
    res.status(200).json({ message: "Usuario logueado", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al loguear el usuario");
  }
}

export async function agregarUsuario(req, res) {
  try {
    const {
      rol,
      estado,
      email,
      pass,
      nombre,
      apellido,
      telefono,
      nacimiento,
      fechaIngreso,
    } = req.body;
    const salt = 10;

    bcrypt.hash(pass, salt, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send("Ha ocurrido un error al crear la contraseaña");
      } else {
        try {
          const result = await agregarUsuarioModel(
            rol,
            estado,
            email,
            hash,
            nombre,
            apellido,
            telefono,
            nacimiento,
            fechaIngreso
          );
          res.status(200).json(result);
        } catch (err) {
          console.log(err);
          res.status(500).send("Error al agregar el usuario");
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al agregar el usuario");
  }
}

export async function ModificarUsuario(req, res) {
  try {
    const {
      idUsuario,
      rol,
      estado,
      email,
      nombre,
      apellido,
      telefono,
      nacimiento,
    } = req.body;
    const result = await modificarUsuarioModel(
      idUsuario,
      rol,
      estado,
      email,
      nombre,
      apellido,
      telefono,
      nacimiento
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al modificar el usuario");
  }
}
