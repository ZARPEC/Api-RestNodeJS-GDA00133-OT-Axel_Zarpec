import sql from "mssql";
import sequelize from "../config/dbConfig.mjs";
import rolesSequelize from "./sequelize/rol.js";

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
        await sequelize.authenticate();
        const roles = await rolesSequelize.findAll();
        return roles;
    }catch(err){
        throw err;
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
