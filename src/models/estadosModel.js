import sql from "mssql";
import dbConfig from "../config/dbConfig.mjs";

export async function agregarEstadoModel(NombreEstado) {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("estado", NombreEstado)
      .execute("spInsertar_estado");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function mostrarEstadosModel() {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query`
        SELECT * FROM estados`;
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function modificarEstadoModel(idEstado, estadoNuevo) {
  try {
    await sql.connect(dbConfig);
    console.log(idEstado, estadoNuevo);
    const result = await new sql.Request().
      input("id", idEstado).
      input("nuevo", estadoNuevo).
      execute("spModificar_estado");
      console.log(result);
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}
