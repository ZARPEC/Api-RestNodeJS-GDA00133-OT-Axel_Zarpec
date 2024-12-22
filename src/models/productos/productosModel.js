import sql from "mssql";
import dbConfig from "../../config/dbConfig.mjs";

export async function agregarProducto(
  nombreP,
  medidaCant,
  unidadMedida,
  subcategoria,
  precio,
  stock,
  rutaimg,
  fechaIn,
  estado
) {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("nombre_producto", nombreP)
      .input("cantidad_medida", medidaCant)
      .input("unidad_medida_fk", unidadMedida)
      .input("subcategoria_fk", subcategoria)
      .input("precio", precio)
      .input("stock", stock)
      .input("ruta_img", rutaimg)
      .input("fecha_ingresoP", fechaIn)
      .input("estado_fk", estado)
      .execute("spInsertar_producto");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function mostrarProductos(categoria, subcategoria) {
  try {
    await sql.connect(dbConfig);
    if (subcategoria == null) {
      const result = await sql.query`
                SELECT
                    p.idProducto,
                    p.nombre_producto,
                    u.unidad,
                    p.cantidad_medida,
                    c.nombre_categoria,
                    s.subcategoria,
                    p.precio,
                    p.stock
                FROM 
                    Producto p
                JOIN 
                    Subcategoria s ON p.subcategoria_prod = s.idSubcategoria
                JOIN 
                    unidad_medida u ON p.unidad_medida_fk = u.idUnidad
                join Categoria_producto c ON s.categoria_fk = c.idCategoria
                WHERE c.nombre_categoria = ${categoria}
                ORDER BY p.nombre_producto ASC `;
      return result.recordset;
    } else {
      const result = await sql.query`
                SELECT 
                    p.idProducto,
                    p.nombre_producto,
                    u.unidad,
                    p.cantidad_medida,
                    c.nombre_categoria,
                    s.subcategoria,
                    sp.subcategoria_padre categoriaPadre,  -- Subcategoría padre
                    p.precio,
                    p.stock
                FROM 
                    Producto p
                JOIN 
                    Subcategoria s ON p.subcategoria_prod = s.idSubcategoria
                JOIN 
                    unidad_medida u ON p.unidad_medida_fk = u.idUnidad
                JOIN 
                    Categoria_producto c ON s.categoria_fk = c.idCategoria
                LEFT JOIN 
                    subcategoria sp ON s.subcategoria_padre = sp.idSubcategoria  -- Unir para obtener la subcategoría padre
                WHERE 
                    s.subcategoria = ${subcategoria} or sp.subcategoria = ${subcategoria} 
                ORDER BY 
                    p.nombre_producto ASC `;
      return result.recordset;
    }
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function modificarProducto(
  id,
  Nnombre,
  NcantidadMedida,
  NunidadMedida,
  Nsubcategoria,
  Nprecio,
  Nstock,
  NrutaImg,
  Nfecha
) {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("id", id)
      .input("nuevoNombre", Nnombre)
      .input("nuevaCantidadMedida", NcantidadMedida)
      .input("nuevaUnidadMedida", NunidadMedida)
      .input("nuevaSubcategoria", Nsubcategoria)
      .input("nuevoPrecio", Nprecio)
      .input("nuevoStock", Nstock)
      .input("nuevaRutaImg", NrutaImg)
      .input("nuevaFechaIngreso", Nfecha)
      .execute("spModificarProducto");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}
