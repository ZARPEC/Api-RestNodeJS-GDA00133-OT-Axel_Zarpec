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
    await sequelize.authenticate();

    const result = await sequelize.query(
      `EXEC spInsertar_producto :nombre_producto, :cantidad_medida, :unidad_medida_fk, :subcategoria_fk, :precio, :stock, :ruta_img, :fecha_ingresoP, :estado_fk`,
      {
        replacements: {
          nombre_producto: nombreP,
          cantidad_medida: medidaCant,
          unidad_medida_fk: unidadMedida,
          subcategoria_fk: subcategoria,
          precio: precio,
          stock: stock,
          ruta_img: rutaimg,
          fecha_ingresoP: fechaIn,
          estado_fk: 1,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result[0][0].idProducto;
  } catch (err) {
    throw err;
  }
}

export async function mostrarProductos(categoria, subcategoria) {
  try {
    await sequelize.authenticate();

    if (categoria == null && subcategoria == null) {
      //categoria y subcategoria son nulos
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
            where: { nombreEstado: "Activo" },
            required: true,
          },
        ],
        raw: true, // Devuelve los resultados en formato plano
        nest: true, // Organiza los alias de manera jerárquica para evitar colisiones
        order: [["nombre_producto", "ASC"]],
      });

      return productosPlanos(productos);
    } else if (subcategoria == null) {
      //entra a categoria

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
            required: false,
          },
          {
            model: EstadosProducto,
            as: "estadofk",
            attributes: [["nombreEstado", "estado"]],
            where: { nombreEstado: "Activo" },
            required: true,
          },
        ],
        raw: true,
        nest: true,
        order: [["nombre_producto", "ASC"]],
      });

      return productosPlanos(productos);
    } else {
      // entro a categoria y subcategoria

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
            where: { nombreEstado: "Activo" },
            required: true,
          },
        ],
        raw: true,
        nest: true,
        order: [["nombre_producto", "ASC"]],
      });

      return productosPlanos(productos);
    }
  } catch (err) {
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
    // Llama al procedimiento almacenado usando una consulta sin procesar
    const result = await sequelize.query(
      `EXEC spModificarProducto :id, :Nnombre, :NcantidadMedida, :NunidadMedida, :Nsubcategoria, :Nprecio, :Nstock, :NrutaImg`,
      {
        replacements: {
          id: id || null,
          Nnombre: Nnombre || null,
          NcantidadMedida: NcantidadMedida || null,
          NunidadMedida: NunidadMedida || null,
          Nsubcategoria: Nsubcategoria || null,
          Nprecio: Nprecio || null,
          Nstock: Nstock || null,
          NrutaImg: NrutaImg || null,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function modificarEstadoProductoModel(id, nuevoEstado) {
  try {
    await sequelize.authenticate();

    const result = await sequelize.query(
      `EXEC spModificar_Estado_Producto :id, :nuevo`,
      {
        replacements: {
          id: id,
          nuevo: nuevoEstado,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}
export async function mostrarProductosInactivosModel() {
  try {
    await sequelize.authenticate();

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
          where: { nombreEstado: "Inactivo" },
          required: true,
        },
      ],
      raw: true, // Devuelve los resultados en formato plano
      nest: true, // Organiza los alias de manera jerárquica para evitar colisiones
      order: [["nombre_producto", "ASC"]],
    });

    return productosPlanos(productos);
  } catch (err) {
    throw err;
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
      estado: producto.estadofk?.estadofk || null,
    };
  });
  return productos;
}
