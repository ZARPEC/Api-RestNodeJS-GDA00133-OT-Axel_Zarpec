import sql from "mssql";
import dbConfig from "../config/dbConfig.mjs";

export async function LoginModel(usuario) {
  try {
    await sql.connect(dbConfig);
    const result =
      await sql.query`SELECT * FROM usuarios WHERE email = ${usuario}`;
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function agregarUsuarioModel(rol,estado,email,pass,nombre,apellido,telefono,nacimiento,fechaIngreso,){
  try{
    await sql.connect(dbConfig);
    const result = await new sql.Request()
    .input("rol",rol)
    .input("estado",estado)
    .input("email",email)
    .input("nombre",nombre)
    .input("apellido",apellido)
    .input("password",pass)
    .input("telefono",telefono)
    .input("nacimiento",nacimiento)
    .input("fechaCreacion",fechaIngreso)
    .execute("spInsertar_usuario");
    return result.recordset;
  }catch(err){
    throw err;
    console.error(err);
  }finally{
    sql.close();
  }
}

export async function modificarUsuarioModel(idUsuario,rol,estado,email,nombre,apellido,telefono,nacimiento){
  try{
    await sql.connect(dbConfig);
    const result = await new sql.Request()
    .input("id",idUsuario)
    .input("nuevoRol",rol)
    .input("NuevoEstado",estado)
    .input("nuevoEmail",email)
    .input("NuevoNombre",nombre)
    .input("NuevoApellido",apellido)
    .input("nuevoTelefono",telefono)
    .input("nuevoFechaNacimiento",nacimiento)
    .execute("spModificarUsuario");
    return result.recordset;
  }catch(err){
    throw err;
    console.error(err);
  }finally{
    sql.close();
  }

}