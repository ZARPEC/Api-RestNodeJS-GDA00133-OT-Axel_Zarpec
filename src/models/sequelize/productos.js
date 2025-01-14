import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/dbConfig.mjs";
import Subcategoria from "./subcategoria.js";
import UnidadMedida from "./unidadMedida.js";
import Estado from "./estados.js";

class Productos extends Model {}

Productos.init(
  {
    idProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_producto: {
      type: DataTypes.STRING,
    },
    cantidad_medida: {
      type: DataTypes.STRING,
    },
    unidad_medida_fk: {
      type: DataTypes.INTEGER,
      references: {
        model: "UnidadMedida",
        key: "idUnidadMedida",
      },
    },
    subcategoria_prod: {
      type: DataTypes.INTEGER,
      references: {
        Model: "Subcategoria",
        key: "idSubcategoria",
      },
    },
    precio: {
      type: DataTypes.DECIMAL,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    ruta_img: {
      type: DataTypes.STRING,
    },
    fecha_ingresoP: {
      type: DataTypes.DATE,
    },
    estado: {
      type: DataTypes.INTEGER,
      references: {
        Model: "Estado",
        key: "idEstado",
      },
    },
  },
  {
    sequelize,
    modelName: "Producto",
    tableName: "Producto",
    timestamps: false,
  }
);

Productos.belongsTo(Subcategoria, {
  foreignKey: "subcategoria_prod",
  as: "subcategoria",
});

Productos.belongsTo(UnidadMedida, {
  foreignKey: "unidad_medida_fk",
  as: "unidadmedida",
});

Productos.belongsTo(Estado, {
  foreignKey: "estado",
  as: "estadofk",
});

export default Productos;
