import sql from "mssql";
import dbConfig from "../config/dbConfig.mjs";
import sequelize from "../config/dbConfig.mjs";
import estadosSequelize from "./sequelize/estados.js";

export async function agregarEstadoModel(NombreEstado) {
  try {
    const result = await sequelize.query(`EXEC spInsertar_estado :estado`, {
      replacements: {
        estado: NombreEstado,
      },
      type: sequelize.QueryTypes.RAW,
    });

    return result;
  } catch (err) {
    throw err;
  }
}

export async function mostrarEstadosModel() {
  try {
    sequelize.authenticate();
    const result = await estadosSequelize.findAll({
      attributes: ["idEstados", "nombreEstado"],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function modificarEstadoModel(idEstado, estadoNuevo) {
  try {
    const result = await sequelize.query(
      `EXEC spModificar_estado :id, :nuevo`,
      {
        replacements: {
          id: idEstado,
          nuevo: estadoNuevo,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
}
