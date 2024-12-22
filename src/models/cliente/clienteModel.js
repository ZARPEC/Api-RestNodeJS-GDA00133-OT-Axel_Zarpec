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
){
    try {
        await sql.connect(dbConfig);
        const result = await new sql.Request().
        input('razon_social', nit).
        input('nombre_comercial', nombre_comercial).
        input('direccion_entrega', direccion).
        input('telefonoCliente', telefono).
        input('emailCliente', email).
        input('rol_fk', rol_fk).
        input('estados_fk', estado_fk).
        input('emailUsuario', email).
        input('nombreUsuario', nombreUsuario).
        input('apellidoUsuario', apellido).
        input('passwordUsuario', pass).
        input('telefonoUsuario', telefono).
        input('fecha_nacimiento', fechaNaciemiento).
        execute('spInsertarClienteYUsuario');
        return result.recordset;

    }catch(err){
        throw err;
        console.error(err);
       
    }
    finally
    {
        sql.close();
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
    pass,
    fechaNaciemiento
){
    try {
        await sql.connect(dbConfig);
        const result = await new sql.Request().
        input('idCliente', idCliente).
        input('razon_social', nit).
        input('nombre_comercial', nombre_comercial).
        input('direccion_entrega', direccion).
        input('telefonoCliente', telefono).
        input('emailCliente', email).
        input('rol_fk', rol_fk).
        input('estados_fk', estado_fk).
        input('emailUsuario', email).
        input('nombreUsuario', nombreUsuario).
        input('apellidoUsuario', apellido).
        input('passwordUsuario', pass).
        input('telefonoUsuario', telefono).
        input('fecha_nacimiento', fechaNaciemiento).
        execute('spModificarClienteYUsuario');
        return result.recordset;

    }catch(err){
        throw err;
        console.error(err);
       
    }
    finally
    {
        sql.close();
    }
}