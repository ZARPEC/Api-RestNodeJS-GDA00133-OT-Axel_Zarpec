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
export async function agregarSubCategoria(
  nombreSubCategoria,
  subcategoria_padre,
  categoria_fk
) {
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

export async function mostrarSubCategorias(categoriaGet, subcategoriaGet) {// muestra las subcategorias asi como subcategorias hijas
  try {
    await sql.connect(dbConfig);
    if (subcategoriaGet == null) {//muestra las subcategorias
      const result = await sql.query`
                SELECT s.idSubcategoria, s.subcategoria, c.nombre_categoria
            FROM Subcategoria s
            JOIN Categoria_producto c ON s.categoria_fk = c.idCategoria
            WHERE c.nombre_categoria = ${categoriaGet}
            AND (s.subcategoria_padre IS NULL OR s.subcategoria_padre = 0)`;
        return result.recordset;
    }else{//muestra las subcategorias hijas
        console.log("entro a subcategoria no null");
        const result = await sql.query`
        SELECT s.idSubcategoria, s.subcategoria, c.nombre_categoria
            FROM Subcategoria s
            JOIN Categoria_producto c ON s.categoria_fk = c.idCategoria
            WHERE s.subcategoria_padre IN (
            SELECT idSubcategoria 
            FROM Subcategoria 
            WHERE s.subcategoria = ${subcategoriaGet})`;
        return result.recordset;

    }
  } catch (err) {
    throw err;
    console.error(err);
  }
}

/* 
productos

     SELECT 
                    p.idProducto,
                    p.nombre_producto
                FROM 
                    Producto p
                JOIN 
                    Subcategoria s ON p.subcategoria_prod = s.idSubcategoria
               
                JOIN Categoria_producto c ON s.categoria_fk= c.idCategoria
				WHERE c.nombre_categoria = ${categoriaGet}
                ORDER BY p.nombre_producto ASC               
*/

/* 
subcategorias hijas
SELECT s.idSubcategoria, s.subcategoria, c.nombre_categoria
            FROM Subcategoria s
            JOIN Categoria_producto c ON s.categoria_fk = c.idCategoria
            WHERE s.subcategoria_padre IN (
            SELECT idSubcategoria 
            FROM Subcategoria 
            WHERE s.subcategoria = 'Camas')


*/
