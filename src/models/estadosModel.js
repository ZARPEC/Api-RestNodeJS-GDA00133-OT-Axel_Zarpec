import sql from "mssql";
import dbConfig from "../config/dbConfig.mjs";

export async function agregarEstadoModel(NombreEstado){
    try{
        await sql.connect(dbConfig);
        const result = await new sql.Request().
        input("estado",NombreEstado).
        execute("spInsertar_estado");
        return result.recordset;
    }catch(err){
        throw err;
        console.error(err);
    }
    finally{
        sql.close();
    }
}

export async function mostrarEstadosModel(){
    try{
        await sql.connect(dbConfig);
        const result = await sql.query`
        SELECT * FROM estados`;
        return result.recordset;
    }catch(err){
        throw err;
        console.error(err);
    }
    finally{
        sql.close();
    }
}