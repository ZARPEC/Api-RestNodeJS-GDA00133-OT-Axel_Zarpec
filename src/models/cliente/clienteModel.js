import sql from "mssql";
import Sequelize from "sequelize";
import sequelize from "../../config/dbConfig.mjs";
import ClienteSequelize from "../sequelize/Cliente.js";
import RolSequelize from "../sequelize/rol.js";
import UsuariosSequelize from "../sequelize/usuarios.js";
import EstadoSequelize from "../sequelize/estados.js";

export async function AgregarCliente(
  nit,
  nombre_comercial,
  direccion,
  telefono,
  email,
  rol_fk,
  estado_fk,
  nombreUsuario,
  apellido,
  pass,
  fechaNaciemiento
) {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("razon_social", nit)
      .input("nombre_comercial", nombre_comercial)
      .input("direccion_entrega", direccion)
      .input("telefonoCliente", telefono)
      .input("emailCliente", email)
      .input("rol_fk", rol_fk)
      .input("estados_fk", estado_fk)
      .input("emailUsuario", email)
      .input("nombreUsuario", nombreUsuario)
      .input("apellidoUsuario", apellido)
      .input("passwordUsuario", pass)
      .input("telefonoUsuario", telefono)
      .input("fecha_nacimiento", fechaNaciemiento)
      .execute("spInsertarClienteYUsuario");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  }
}

export async function modificarClienteModel(
  idCliente,
  nit,
  nombre_comercial,
  direccion,
  telefono,
  email,
  rol_fk,
  estado_fk,
  nombreUsuario,
  apellido,
  fechaNaciemiento
) {
  try {
    const result = await sequelize.query(
      `EXEC spModificarClienteYUsuario :idCliente, :razon_Social, :nombre_Comercial, 
      :direccion_Entrega, :telefonoCliente, :emailCliente, :rol_fk, :estados_fk, :emailUsuario,
      :nombreUsuario, :apellidoUsuario, :telefonoUsuario, :fecha_nacimiento`,
      {
        replacements: {
          idCliente: idCliente,
          razon_Social: nit,
          nombre_Comercial: nombre_comercial,
          direccion_Entrega: direccion,
          telefonoCliente: telefono,
          emailCliente: email,
          rol_fk: rol_fk,
          estados_fk: estado_fk,
          emailUsuario: email,
          nombreUsuario: nombreUsuario,
          apellidoUsuario: apellido,
          telefonoUsuario: telefono,
          fecha_nacimiento: fechaNaciemiento,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function modificarEstadoClienteModel(id, nuevo) {
  try {
    const result = await sequelize.query(
      `EXEC spModificar_estados_tUsuario :id, :nuevo`,
      {
        replacements: {
          id: id,
          nuevo: nuevo,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function mostrarClientesModel(estadoInactivo) {
  try {
    await sequelize.authenticate();
    const usuarios = await UsuariosSequelize.findAll({
      attributes: ["idUsuario", "nombre", "apellido", "email", "telefono"],
      include: [
        {
          model: EstadoSequelize,
          as: "estadofk",
          attributes: ["nombreEstado"],
        },
        {
          model: RolSequelize,
          as: "rolfk",
          attributes: ["idRol", "nombreRol"],
        },
      ],
      raw: true,
      nest: true,
      where: {
        estados_fk: estadoInactivo ? 3 : 1,
      },
    });
    return usuarios;
  } catch (err) {
    throw err;
  }
}
