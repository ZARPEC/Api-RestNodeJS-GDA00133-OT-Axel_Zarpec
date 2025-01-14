import sql from "mssql";
import dbConfig from "../../config/dbConfig.mjs";
import sequelize from "../../config/dbConfig.mjs";
import SubcategoriaProducto from "../sequelize/subcategoria.js";
import Productos from "../sequelize/productos.js";
import UnidadMedidaProducto from "../sequelize/unidadMedida.js";
import CategoriaProducto from "../sequelize/categoria.js";
import EstadosProducto from "../sequelize/estados.js";

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
  }
}

export async function mostrarProductos(categoria, subcategoria) {
  try {
    await sequelize.authenticate();

    if (categoria == null && subcategoria == null) {
      console.log("Entro a subcategoria null y categoria null");

      const productos = await Productos.findAll({
        attributes: [
          "idProducto",
          "nombre_producto",
          "cantidad_medida",
          "precio",
          "stock",
          "ruta_img",
        ],
        include: [
          {
            model: SubcategoriaProducto,
            as: "subcategoria",
            attributes: [["subcategoria", "nombreSubcategoria"]],
            include: [
              {
                model: CategoriaProducto,
                as: "categoria",
                attributes: [["nombre_categoria", "nombreCategoria"]],
              },
            ],
          },
          {
            model: UnidadMedidaProducto,
            as: "unidadmedida",
            attributes: [["unidad", "unidadMedida"]],
          },
          {
            model: EstadosProducto,
            as: "estadofk",
            attributes: [["nombreEstado", "estadofk"]],
          },
        ],
        raw: true, // Devuelve los resultados en formato plano
        nest: true, // Organiza los alias de manera jerárquica para evitar colisiones
        order: [["nombre_producto", "ASC"]],
      });

      const productosordenados = productosPlanos(productos);

      return productosordenados;
    } else if (subcategoria == null) {
      console.log("Entro a subcategoria null");

      const productos = await Productos.findAll({
        attributes: [
          "idProducto",
          "nombre_producto",
          "cantidad_medida",
          "precio",
          "stock",
          "ruta_img",
        ],
        include: [
          {
            model: SubcategoriaProducto,
            as: "subcategoria",
            attributes: [["subcategoria", "nombreSubcategoria"]],
            required: true, 
            include: [
              {
                model: CategoriaProducto,
                as: "categoria",
                attributes: [["nombre_categoria", "nombreCategoria"]],
                where: { nombre_categoria: categoria }, 
                required: true, 
              },
            ],
          },
          {
            model: UnidadMedidaProducto,
            as: "unidadmedida",
            attributes: [["unidad", "unidadMedida"]],
            required: false, // Opcional, puede estar ausente
          },
          {
            model: EstadosProducto,
            as: "estadofk",
            attributes: [["nombreEstado", "estado"]],
            required: false, // Opcional, puede estar ausente
          },
        ],
        raw: true,
        nest: true,
        order: [["nombre_producto", "ASC"]],
      });

      const productosordenados = productosPlanos(productos);

      return productosordenados;
    } else {
      console.log("Entro a categoría y subcategoría");

      const productos = await Productos.findAll({
        attributes: [
          "idProducto",
          "nombre_producto",
          "cantidad_medida",
          "precio",
          "stock",
          "ruta_img",
        ],
        include: [
          {
            model: SubcategoriaProducto,
            as: "subcategoria",
            attributes: [["subcategoria", "nombreSubcategoria"]],
            where: { subcategoria: subcategoria },
            required: true, 
            include: [
              {
                model: CategoriaProducto,
                as: "categoria",
                attributes: [["nombre_categoria", "nombreCategoria"]],
                where: { nombre_categoria: categoria }, 
                required: true, 
              },
            ],
          },
          {
            model: UnidadMedidaProducto,
            as: "unidadmedida",
            attributes: [["unidad", "unidadMedida"]],
            required: false, 
          },
          {
            model: EstadosProducto,
            as: "estadofk",
            attributes: [["nombreEstado", "estado"]],
            required: false, 
          },
        ],
        raw: true,
        nest: true,
        order: [["nombre_producto", "ASC"]],
      });
      console.log(productos);

      const productosordenados = productosPlanos(productos);

      return productosordenados;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function modificarProductoModel(
  id,
  Nnombre,
  NcantidadMedida,
  NunidadMedida,
  Nsubcategoria,
  Nprecio,
  Nstock,
  NrutaImg
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
      .execute("spModificarProducto");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  }
}

export async function modificarEstadoProductoModel(id, nuevoEstado) {
  try {
    await sql.connect(dbConfig);
    const result = await new sql.Request()
      .input("id", id)
      .input("nuevo", nuevoEstado)
      .execute("spModificar_Estado_Producto");
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  }
}
export async function mostrarProductosInactivosModel() {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query`
        SELECT 
            p.idProducto,
            p.nombre_producto,
            u.unidad,
            p.cantidad_medida,
            c.nombre_categoria,
            s.subcategoria,
            p.precio,
            p.stock,
            p.ruta_img,
            e.nombreEstado
        FROM 
            Producto p
        JOIN 
            Subcategoria s ON p.subcategoria_prod = s.idSubcategoria
        JOIN 
            unidad_medida u ON p.unidad_medida_fk = u.idUnidad
        join Categoria_producto c ON s.categoria_fk = c.idCategoria
        JOIN estados e ON e.idEstados=p.estado
        WHERE p.estado = 3
        ORDER BY p.nombre_producto ASC `;
    return result.recordset;
  } catch (err) {
    throw err;
    console.error(err);
  }
}

function productosPlanos(productos) {
  return productos.map((producto) => {
    return {
      idProducto: producto.idProducto,
      nombre_producto: producto.nombre_producto,
      cantidad_medida: producto.cantidad_medida,
      precio: producto.precio,
      stock: producto.stock,
      ruta_img: producto.ruta_img,
      nombreSubcategoria: producto.subcategoria?.nombreSubcategoria || null,
      idCategoria: producto.subcategoria?.categoria?.idCategoria || null,
      nombreCategoria:
        producto.subcategoria?.categoria?.nombreCategoria || null,
      unidadMedida: producto.unidadmedida?.unidadMedida || null,
      estado: producto.estadofk?.estado || null,
    };
  });
  return productos;
}
