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

    console.log(detalles);

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

export async function mostrarOrdenesModel(idCliente) {
  try {
    await sql.connect(dbConfig);
    if (idCliente == null) {
      const result = await sql.query`
      SELECT 
    idorden, 
    u.nombre, 
    u.apellido, 
    u.email, 
    c.nombre_Comercial, 
    o.direccion, 
    STRING_AGG(
        CONCAT(p.nombre_producto, ' (', p.cantidad_medida, ': ', dt.cantidad, ' x ', p.precio, ')'), 
        ', ' 
    ) AS productos, 
    SUM(p.precio * dt.cantidad) AS total, 
    o.fecha_orden, 
    e.nombreEstado
FROM 
    DETALLES_ORDEN dt
INNER JOIN 
    orden o ON o.idorden = dt.orden
INNER JOIN 
    usuarios u ON o.usuario_fk = u.idUsuario
INNER JOIN 
    Clientes c ON c.idCliente = u.cliente_fk
INNER JOIN 
    producto p ON dt.producto_orden = p.idproducto
INNER JOIN 
    estados e ON o.estado_fk = e.idEstados
    where e.nombreEstado='entregado'
GROUP BY 
    idorden, u.nombre, u.apellido, u.email, c.nombre_Comercial, o.direccion, o.fecha_orden, e.nombreEstado;
`;
      return result.recordset;
    } else {
      const result = await sql.query`
      SELECT 
    idorden, 
    u.nombre, 
    u.apellido, 
    u.email, 
    c.nombre_Comercial, 
    o.direccion, 
    STRING_AGG(
        CONCAT(p.nombre_producto, ' (', p.cantidad_medida, ': ', dt.cantidad, ' x ', p.precio, ')'), 
        ', ' 
    ) AS productos, 
    SUM(p.precio * dt.cantidad) AS total, 
    o.fecha_orden, 
    e.nombreEstado
FROM 
    DETALLES_ORDEN dt
INNER JOIN 
    orden o ON o.idorden = dt.orden
INNER JOIN 
    usuarios u ON o.usuario_fk = u.idUsuario
INNER JOIN 
    Clientes c ON c.idCliente = u.cliente_fk
INNER JOIN 
    producto p ON dt.producto_orden = p.idproducto
INNER JOIN 
    estados e ON o.estado_fk = e.idEstados
    where c.idCliente = ${idCliente}
GROUP BY 
    idorden, u.nombre, u.apellido, u.email, c.nombre_Comercial, o.direccion, o.fecha_orden, e.nombreEstado;`;
      return result.recordset;
    }
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function mostrarOrdenesPendientesModel() {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query`
    SELECT 
    idorden, 
    u.nombre, 
    u.apellido, 
    u.email, 
    c.nombre_Comercial, 
    o.direccion, 
    STRING_AGG(
        CONCAT(p.nombre_producto, ' (', p.cantidad_medida, ': ', dt.cantidad, ' x ', p.precio, ')'), 
        ', ' 
    ) AS productos, 
    SUM(p.precio * dt.cantidad) AS total, 
    o.fecha_orden, 
    e.nombreEstado
FROM 
    DETALLES_ORDEN dt
INNER JOIN 
    orden o ON o.idorden = dt.orden
INNER JOIN 
    usuarios u ON o.usuario_fk = u.idUsuario
INNER JOIN 
    Clientes c ON c.idCliente = u.cliente_fk
INNER JOIN 
    producto p ON dt.producto_orden = p.idproducto
INNER JOIN 
    estados e ON o.estado_fk = e.idEstados
    where e.nombreEstado='pendiente'
GROUP BY 
    idorden, u.nombre, u.apellido, u.email, c.nombre_Comercial, o.direccion, o.fecha_orden, e.nombreEstado;
`;
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function modificarOrdenModel(id, usuario_fk, direccion) {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("id", id)
      .input("usuario_fk", usuario_fk)
      .input("direccion", direccion)
      .execute("spModificarOrden");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}

export async function actualizarEstadoModel(id, estado) {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("id", id)
      .input("nuevo", estado)
      .execute("spModificar_estado_orden");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  } finally {
    sql.close();
  }
}
