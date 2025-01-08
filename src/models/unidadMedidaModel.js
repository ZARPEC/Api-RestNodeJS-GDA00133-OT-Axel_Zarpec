import sql from "mssql";
import dbConfig from "../config/dbConfig.mjs";

export async function MostrarUnidadMedidaModel() {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM unidad_medida`;
        return result.recordset;
    } catch (err) {
        throw err;
        console.error(err);
    }
}