import sql from "mssql";
import Ordensequelize from "./sequelize/orden.js";
import sequelize from "../config/dbConfig.mjs";
import usuarioSequelize from "./sequelize/usuarios.js";
import clienteSequelize from "./sequelize/Cliente.js";
import estadoSequelize from "./sequelize/estados.js";
import productosSequelize from "./sequelize/productos.js";
import detallesOrden from "./sequelize/detallesOrden.js";

export async function AgregarOrdenModel(
  usuario,
  estado,
  fecha,
  direccion,
  detalles
) {
  try {
    const detallesOrden = JSON.stringify(detalles); 

    const result = await sequelize.query(
      `EXEC spInsertar_orden_con_detalles 
    @usuario_fk = :usuario_fk, 
    @estado_fk = :estado_fk, 
    @fecha_orden = :fecha_orden, 
    @direccion = :direccion, 
    @detalles_orden = :detalles_orden`,
      {
        replacements: {
          usuario_fk: usuario,
          estado_fk: estado,
          fecha_orden: fecha,
          direccion: direccion,
          detalles_orden: detallesOrden, 
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return result; 
  } catch (error) {
    console.error("Error al ejecutar el procedimiento almacenado:", error);
    throw error;
  }
}

export async function mostrarOrdenesModel(idCliente, estado) {
  try {
    await sequelize.authenticate();
    if (idCliente == null) {
      const ordenes = await detallesOrden.findAll({
        attributes: ["iddetalle", "orden", "producto_orden", "cantidad"],
        include: [
          {
            model: Ordensequelize,
            as: "ordenfk",
            attributes: [
              ["idorden", "idorden"],
              ["fecha_orden", "fecha_orden"],
              "direccion",
            ],
            required: true,
            include: [
              {
                model: estadoSequelize,
                as: "estados",
                attributes: [["nombreEstado", "estados"]],
                where: { nombreEstado: estado },
                required: true,
              },
              {
                model: usuarioSequelize,
                as: "usuario",
                attributes: [["email", "correo"], "nombre", "apellido"],
                required: true,
                include: [
                  {
                    model: clienteSequelize,
                    as: "clientefk",
                    attributes: ["nombre_comercial"],
                  },
                ],
              },
            ],
          },
          {
            model: productosSequelize,
            as: "productofk",
            attributes: [
              ["nombre_producto", "producto"],
              ["cantidad_medida", "cantidad_medida"],
              ["precio", "precio"],
            ],
          },
        ],

        raw: true,
      });

      return procesado(ordenes);
    } else {
      idCliente = parseInt(idCliente);
      const ordenes = await detallesOrden.findAll({
        attributes: ["iddetalle", "orden", "producto_orden", "cantidad"],
        include: [
          {
            model: Ordensequelize,
            as: "ordenfk",
            attributes: [
              ["idorden", "idorden"],
              ["fecha_orden", "fecha_orden"],
              "direccion",
            ],required: true,
            include: [
              {
                model: estadoSequelize,
                as: "estados",
                attributes: [["nombreEstado", "estados"]],
                required: true,
              },
              {
                model: usuarioSequelize,
                as: "usuario",
                attributes: [["email", "correo"], "nombre", "apellido"],
                where: { idUsuario:idCliente},
                required: true,
                include: [
                  {
                    model: clienteSequelize,
                    as: "clientefk",
                    attributes: ["nombre_comercial", "idCliente"],
            
                  },
                ],
              },
            ],
          },
          {
            model: productosSequelize,
            as: "productofk",
            attributes: [
              ["nombre_producto", "producto"],
              ["cantidad_medida", "cantidad_medida"],
              ["precio", "precio"],
            ],
          },
        ],

        raw: true,
      });

      return procesado(ordenes);
    }
  } catch (err) {
    console.error("Error al obtener las órdenes:", err);
    throw err;
  }
}

export async function modificarOrdenModel(id, usuario_fk, direccion) {
  try {
    const result = await sequelize.query(
      `EXEC spModificarOrden :id, :usuario_fk, :direccion`,
      {
        replacements: {
          id: id,
          usuario_fk: usuario_fk || null,
          direccion: direccion || null,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function actualizarEstadoModel(id, estado) {
  try {
    const result = await sequelize.query(
      `EXEC spModificar_estado_orden :id, :nuevo`,
      {
        replacements: {
          id: id,
          nuevo: estado,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return result;
  } catch (err) {
    throw err;
  }
}

export async function rechazarOrdenModel(id) {
  try {
    const result = await sequelize.query(
      `EXEC spModificar_estado_orden :id, :nuevo`,
      {
        replacements: {
          id: id,
          nuevo: estado,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
  } catch (err) {
    throw err;
  }
}

function procesado(ordenes) {
  return ordenes.map((orden) => ({
    idorden: orden["ordenfk.idorden"],
    iddetalle: orden.iddetalle,
    nombre: orden["ordenfk.usuario.nombre"],
    apellido: orden["ordenfk.usuario.apellido"],
    producto: orden["productofk.producto"],
    cantidad: orden.cantidad,
    precio: orden["productofk.precio"],
    total: orden.cantidad * orden["productofk.precio"],
    nombreEstado: orden["ordenfk.estados.estados"],
    fecha_orden: orden["ordenfk.fecha_orden"],
    nombre_comercial: orden["ordenfk.usuario.clientefk.nombre_comercial"],
    direccion: orden["ordenfk.direccion"],
  }));
}
