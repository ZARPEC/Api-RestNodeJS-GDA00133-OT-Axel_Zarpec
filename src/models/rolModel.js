import sql from "mssql";
import dbConfig from "../config/dbConfig.mjs";

export async function AgregarRolModel(rol){
    try{
        await sql.connect(dbConfig);
        const result = await new sql.Request().
        input("rol",rol).
        execute("spInsertar_rol");
        return result.recordset;
    }catch(err){
        throw err;
        console.error(err);
    }
    finally{
        sql.close();
    }
}

export async function mostrarRolesModel(){
    try{
        await sql.connect(dbConfig);
        const result = await sql.query`
        SELECT * FROM rol`;
        return result.recordset;
    }catch(err){
        throw err;
        console.error(err);
    }
    finally{
        sql.close();
    }
}

export async function modificarRolModel(idrol,rolNuevo){
    try{
        await sql.connect(dbConfig);
        const result = await new sql.Request().
        input('id',idrol).
        input('nuevo',rolNuevo).
        execute('spModificar_rol');
        return result.recordset;
    }catch(err){
        throw err;
        console.error(err);
    }
    finally{
        sql.close();
    }
}
