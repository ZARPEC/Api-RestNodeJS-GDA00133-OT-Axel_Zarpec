import sql from "mssql";
import sequelize from "../config/dbConfig.mjs";
import usuarioSequelize from "./sequelize/usuarios.js";
import RolSequelize from "./sequelize/rol.js";
import EstadoSequelize from "./sequelize/estados.js";

export async function LoginModel(usuario) {
  try {
    console.log(usuario);
    await sequelize.authenticate();
    const result = await usuarioSequelize.findOne({
      attributes: [
        "idUsuario",
        "rol_fk",
        "email",
        "password",
        "nombre",
        "apellido",
        "telefono",
        "fecha_nacimiento",
        "fecha_creacion",
      ],
      include: [
        {
          model: RolSequelize,
          as: "rolfk",
          attributes: ["idRol", "nombreRol"],
        },
        {
          model: EstadoSequelize,
          as: "estadofk",
          attributes: ["idEstados", "nombreEstado"],
        },
      ],
      nest: true,
      where: {
        email: usuario,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function agregarUsuarioModel(
  rol,
  estado,
  email,
  pass,
  nombre,
  apellido,
  telefono,
  nacimiento,
  fechaIngreso
) {
  try {


    const result = await sequelize.query(
      `EXEC spInsertar_usuario :rol, :estado, :email, :nombre, :apellido, :password, :telefono, :nacimiento, :fechaCreacion`,
      {
        replacements: {
          rol: rol,
          estado: 1,
          email: email,
          nombre: nombre,
          apellido: apellido,
          password: pass,
          telefono: telefono,
          nacimiento: nacimiento,
          fechaCreacion: fechaIngreso,
        },
      }
    )
    return result[0][0].idUsuario;
  } catch (err) {
    throw err;
  }
}

export async function modificarUsuarioModel(
  idUsuario,
  rol,
  estado,
  email,
  nombre,
  apellido,
  telefono,
  nacimiento,
  password
) {
  try {
    const result = await sequelize.query(
      `EXEC spModificarUsuario :id, :nuevoRol, :NuevoEstado, :nuevoEmail, :NuevoNombre, :nuevapass,  :NuevoApellido, :nuevoTelefono, :nuevoFechaNacimiento`,
      {
        replacements: {
          id: idUsuario||null,
          nuevoRol: rol||null,
          NuevoEstado: estado||null,
          nuevoEmail: email||null,
          NuevoNombre: nombre||null,
          nuevapass: password||null,
          NuevoApellido: apellido||null,
          nuevoTelefono: telefono||null,
          nuevoFechaNacimiento: nacimiento||null,
        },
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}
