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
   
    if (user ==null) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } 
    else if (user.estadofk.nombreEstado === "Inactivo") {
      return res.status(403).json({ message: "Usuario inactivo" }); //pendiente de terminsr
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      {
        id: user.idUsuario,
        nombreUsuario: user.nombre,
        apellidoUsuario: user.apellido,
        rol: user.rolfk.nombreRol,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    console.log(token);
    res.status(200).json({ message: "Usuario logueado", token: token });
  } catch (error) {
    
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
  const salt = 10;
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
      password,
    } = req.body;

    if (typeof password === "undefined" || password.trim() === "") {
      try {
        const result = await modificarUsuarioModel(
          idUsuario,
          rol,
          estado,
          email,
          nombre,
          apellido,
          telefono,
          nacimiento,
          password
        );
        res.status(200).json({ success: true, id: result });
      } catch (err) {
        console.error(err);
        res.status(500).send("Error al modificar el usuario");
      }
    } else {
      // Generar hash de la contraseña
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send("Ha ocurrido un error al crear la contraseña");
        }

        console.log({
          idUsuario,
          rol,
          estado,
          email,
          nombre,
          apellido,
          telefono,
          nacimiento,
          hash,
        });

        try {
          const result = await modificarUsuarioModel(
            idUsuario,
            rol,
            estado,
            email,
            nombre,
            apellido,
            telefono,
            nacimiento,
            hash
          );
          res.status(200).json({ success: true, id: result });
        } catch (err) {
          console.error(err);
          res.status(500).send("Error al modificar el usuario");
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al modificar el usuario");
  }
}
