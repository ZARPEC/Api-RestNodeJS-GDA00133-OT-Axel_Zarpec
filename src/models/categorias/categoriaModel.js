import sql from "mssql";
import dbConfig from "../../config/dbConfig.mjs";
import categoriaSequelize from "../sequelize/categoria.js";
import subcategoriaSequelize from "../sequelize/subcategoria.js";
import Sequelize from "sequelize";
import sequelize from "../../config/dbConfig.mjs";
const { Op } = Sequelize;
//categorias
export async function agregarCategoria(nombreCategoria) {
  try {
    const result = await sequelize.query(
      `EXEC spInsertar_Categoria :Categoria`,
      {
        replacements: {
          Categoria: nombreCategoria,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result;
  } catch (err) {
    throw err;
  } finally {
    sql.close();
  }
}

export async function mostrarCategoriasModel() {
  try {
    await sequelize.authenticate();
    const categorias = await categoriaSequelize.findAll({
      attributes: ["idCategoria", "nombre_categoria"],
    });
    return categorias;
  } catch (err) {
    throw err;
  }
}

export async function modificarCategoriaModel(idCategoria, nombreCategoria) {
  try {
    const result = await sequelize.query(
      `EXEC spModificar_Categoria :id, :nuevo`,
      {
        replacements: {
          id: idCategoria,
          nuevo: nombreCategoria,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return result;
  } catch (err) {
    throw err;
  }
}

//subcategorias
export async function agregarSubCategoria(
  nombreSubCategoria,
  subcategoria_padre,
  categoria_fk
) {
  try {
    const result = await sequelize.query(
      `EXEC spInsertar_subcategoria :subcategoria, :subcategoria_padre, :categoria_fk`,
      {
        replacements: {
          subcategoria: nombreSubCategoria,
          subcategoria_padre: subcategoria_padre,
          categoria_fk: categoria_fk,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
}

export async function mostrarSubCategorias(categoriaGet, subcategoriaGet) {
  try {
    await sequelize.authenticate();
    if (subcategoriaGet == null) {
      //muestra las subcategorias
      const subcategorias = await subcategoriaSequelize.findAll({
        attributes: ["idSubcategoria", "subcategoria"],
        include: [
          {
            model: categoriaSequelize,
            as: "categoria",
            attributes: ["nombre_categoria"],
            where: { nombre_categoria: categoriaGet },
          },
        ],
        raw: true,
        nest: true,
        where: {
          [Op.or]: [{ subcategoria_padre: null }, { subcategoria_padre: 0 }],
        },
      });

      return subcategorias;
    } else {
      const subcategorias = await sequelize.models.Subcategoria.findAll({
        attributes: ["idSubcategoria", "subcategoria"],
        include: [
          {
            model: categoriaSequelize,
            as: "categoria",
            attributes: ["nombre_categoria"],
          },
        ],
        where: sequelize.where(sequelize.col("subcategoria_padre"), {
          [Op.in]: sequelize.literal(`(
              SELECT idSubcategoria 
              FROM Subcategoria 
              WHERE subcategoria = '${subcategoriaGet}'
            )`),
        }),
      });
      return subcategorias;
    }
  } catch (err) {
    throw err;
  }
}

export async function modificarSubCategoriaModel(
  idSubcategoria,
  nombreSubcategoria,
  subcategoria_padre,
  categoria_fk
) {
  try {
    const result = await sequelize.query(
      `EXEC spModificarSubcategoria :id, :nuevoNombre, :nuevosubcategoriaPadre, :nuevocategoriaFK`,
      {
        replacements: {
          id: idSubcategoria,
          nuevoNombre: nombreSubcategoria,
          nuevosubcategoriaPadre: subcategoria_padre,
          nuevocategoriaFK: categoria_fk,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    return result;
  } catch (err) {
    throw err;
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
