import sql from "mssql";
import sequelize from "../config/dbConfig.mjs";
import unidadMedidaSequelize from "./sequelize/unidadMedida.js";

export async function MostrarUnidadMedidaModel() {
    try {
        await sequelize.authenticate();
        const unidadMedida = await unidadMedidaSequelize.findAll({
            attributes: ["idUnidad", "unidad"],
        })
        return unidadMedida;

    } catch (err) {
        throw err;
    }
}