import sql from "mssql";
import sequelize from "../config/dbConfig.mjs";
import rolesSequelize from "./sequelize/rol.js";

export async function AgregarRolModel(rol) {
  try {
    const result = await sequelize.query(`EXEC spInsertar_rol :rol`, {
      replacements: {
        rol: rol,
      },
      type: sequelize.QueryTypes.RAW,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function mostrarRolesModel() {
  try {
    await sequelize.authenticate();
    const roles = await rolesSequelize.findAll();
    return roles;
  } catch (err) {
    throw err;
  }
}

export async function modificarRolModel(idrol, rolNuevo) {
  try {
    const result = await sequelize.query(`EXEC spModificar_rol :id, :nuevo`, {
      replacements: {
        id: idrol,
        nuevo: rolNuevo,
      },
      type: sequelize.QueryTypes.RAW,
    });
    return result;
  } catch (err) {
    throw err;
  }
}
