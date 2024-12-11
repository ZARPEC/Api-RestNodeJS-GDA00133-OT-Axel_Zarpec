import sql from "mssql";
import dbConfig from "../../config/dbConfig.mjs";


export async function agregarCategoria(nombreCategoria){
    try {

        await sql.connect(dbConfig);
        const result = await sql.query`insert into dbo.Categoria_producto (nombre_categoria) values (${nombreCategoria})`;
        return result.recordset;
    }catch(err){

        throw err;
    }finally{
        sql.close();
    }
}

export async function agregarSubCategoria(nombreSubCategoria, subcategoria_padre, categoria_fk){
    try {

        await sql.connect(dbConfig);
        await sql.query`insert into dbo.subcategoria (subcategoria, subcategoria_padre,categoria_fk) values (${nombreSubCategoria}, ${subcategoria_padre}, ${categoria_fk})`;
    }catch(err){

        throw err;
    }finally{
        sql.close();
    }
}

export async function mostrarCategorias() {
    try{
        await sql.connect(dbConfig);
        const result = await sql.query`select * from dbo.Categoria_producto`;
        return result.recordset;
    }catch(err){
        throw err;
    }finally{
        sql.close();
    }
}

