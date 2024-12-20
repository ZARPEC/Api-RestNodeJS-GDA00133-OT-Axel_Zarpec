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
    console.error(detalles);

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
