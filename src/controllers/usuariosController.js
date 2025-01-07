import {
  LoginModel,
  agregarUsuarioModel,
  modificarUsuarioModel,
} from "../models/usuarioModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await LoginModel(email);
    if (user.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const validPass = await bcrypt.compare(password, user[0].password);
    if (!validPass) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    console.log(user[0]);
    const token = jwt.sign(
      {
        id: user[0].idUsuario,
        nombreUsuario: user[0].nombre,
        apellidoUsuario: user[0].apellido,
        rol: user[0].nombreRol,
      },
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
  let date_time = new Date();
  const dia = ("0" + date_time.getDate()).slice(-2);
  const mes = ("0" + (date_time.getMonth() + 1)).slice(-2);
  const anio = date_time.getFullYear();
  const hora = date_time.getHours();
  const minutos = date_time.getMinutes();
  const segundos = date_time.getSeconds();
  const fechain =
    anio + "/" + mes + "/" + dia + " " + hora + ":" + minutos + ":" + segundos;
  try {
    const { rol, estado, email, pass, nombre, apellido, telefono, nacimiento } =
      req.body;
    const fechaIngreso = fechain;
    console.log({
      rol,
      estado,
      email,
      pass,
      nombre,
      apellido,
      telefono,
      nacimiento,
      fechaIngreso,
    });
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
          res.status(200).json({ success: true, id: result });
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
    console.log({
      idUsuario,
      rol,
      estado,
      email,
      nombre,
      apellido,
      telefono,
      nacimiento,
    });
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
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al modificar el usuario");
  }
}
