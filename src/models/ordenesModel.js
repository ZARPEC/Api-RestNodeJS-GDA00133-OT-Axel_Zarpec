import sql from "mssql";
import dbConfig from "../config/dbConfig.mjs";

export async function AgregarOrdenModel(
  usuario,
  estado,
  fecha,
  direccion,
  detalles
) {
  try {
    await sql.connect(dbConfig);
    const productos = new sql.Table();
    productos.columns.add("producto_orden", sql.Int);
    productos.columns.add("cantidad", sql.Float);

    detalles.forEach((detalle) => {
      productos.rows.add(detalle.producto_orden, detalle.cantidad);
    });

    const result = await new sql.Request()
      .input("usuario_fk", usuario)
      .input("estado_fk", estado)
      .input("fecha_orden", fecha)
      .input("direccion", direccion)
      .input("detalles_orden", productos)
      .execute("spInsertar_orden_con_detalles");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function mostrarOrdenesModel(idCliente){
  try{ 
    await sql.connect(dbConfig);
    if (idCliente==null){
      const result = await sql.query `
      SELECT idorden, u.nombre, u.apellido, u.email, c.nombre_Comercial, o.direccion, p.nombre_producto, p.cantidad_medida,
		          cantidad, p.precio, (p.precio * cantidad) total, o.fecha_orden, e.nombreEstado
      FROM DETALLES_ORDEN dt
      INNER JOIN orden o ON o.idorden = dt.orden
      INNER JOIN usuarios u ON o.usuario_fk = u.idUsuario
      INNER JOIN Clientes c ON c.idCliente = u.cliente_fk
      INNER JOIN producto p ON dt.producto_orden = p.idproducto
      INNER JOIN estados e ON o.estado_fk = e.idEstados`;
      return result.recordset;
    }
    else {
      const result = await sql.query `
      SELECT idorden, u.nombre, u.apellido, u.email, c.nombre_Comercial, o.direccion, p.nombre_producto, p.cantidad_medida,
              cantidad, p.precio, (p.precio * cantidad) total, o.fecha_orden, e.nombreEstado
      FROM DETALLES_ORDEN dt
      INNER JOIN orden o ON o.idorden = dt.orden
      INNER JOIN usuarios u ON o.usuario_fk = u.idUsuario
      INNER JOIN Clientes c ON c.idCliente = u.cliente_fk
      INNER JOIN producto p ON dt.producto_orden = p.idproducto
      INNER JOIN estados e ON o.estado_fk = e.idEstados
      WHERE c.idCliente = ${idCliente}`;
      return result.recordset;
    }
   
  }
  catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}
