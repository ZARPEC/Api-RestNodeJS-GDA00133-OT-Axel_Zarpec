import sql from "mssql";
import dbConfig from "../../config/dbConfig.mjs";

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
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("idCliente", idCliente)
      .input("razon_Social", nit)
      .input("nombre_Comercial", nombre_comercial)
      .input("direccion_Entrega", direccion)
      .input("telefonoCliente", telefono)
      .input("emailCliente", email)
      .input("rol_fk", rol_fk)
      .input("estados_fk", estado_fk)
      .input("emailUsuario", email)
      .input("nombreUsuario", nombreUsuario)
      .input("apellidoUsuario", apellido)
      .input("telefonoUsuario", telefono)
      .input("fecha_nacimiento", fechaNaciemiento)
      .execute("spModificarClienteYUsuario");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function modificarEstadoClienteModel(id, nuevoEstado) {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("id", id)
      .input("nuevo", nuevoEstado)
      .execute("spModificar_estados_tUsuario");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function mostrarClientesModel(estado) {
  try {
    await sql.connect(dbConfig);

    const result = await sql.query`
        SELECT u.idUsuario,u.nombre,u.apellido, u.email, u.telefono,r.nombreRol, e.nombreEstado from usuarios u
        INNER JOIN estados e ON u.estados_fk = e.idEstados
        INNER JOIN rol r ON r.idRol= u.rol_fk
        WHERE e.nombreEstado=${estado ? "Inactivo" : "Activo"};`;

    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  }
}
