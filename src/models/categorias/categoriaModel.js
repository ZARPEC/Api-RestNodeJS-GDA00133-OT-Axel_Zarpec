import sql from "mssql";
import dbConfig from "../../config/dbConfig.mjs";

//categorias
export async function agregarCategoria(nombreCategoria) {
  try {
    await sql.connect(dbConfig); //Se conecta a la base de datos
    const result = await new sql.Request()
      .input("Categoria", nombreCategoria)
      .execute("spInsertar_Categoria"); //Se inserta la categoria en la base de datos
    return result.recordset; //Se retorna el resultado
    /*
        const result = await sql.query`insert into dbo.Categoria_producto (nombre_categoria) values (${nombreCategoria})`;//Se inserta la categoria en la base de datos
        return result.recordset; //Se retorna el resultado */
  } catch (err) {
    throw err; //en caso de error se lanza una excepcion mostrando el error
    console.log(err);
  } finally {
    sql.close();
  }
}

export async function mostrarCategorias() {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query`select * from dbo.Categoria_producto`;
    return result.recordset;
  } catch (err) {
    throw err;
  } finally {
    sql.close();
  }
}

//subcategorias
export async function agregarSubCategoria(nombreSubCategoria,subcategoria_padre,categoria_fk)
 {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("subcategoria", nombreSubCategoria)
      .input("subcategoria_padre", subcategoria_padre)
      .input("categoria_fk", categoria_fk)
      .execute("spInsertar_subcategoria");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function mostrarSubCategorias(){
    
}
