import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/dbConfig.mjs";
import Usuario from "./usuarios.js";
import Estados from "./estados.js";

class Orden extends Model {}

Orden.init(
  {
    idorden: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_fk: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "idUsuario",
      },
    },
    estado_fk: {
      type: DataTypes.INTEGER,
      references: {
        model: "estados",
        key: "idEstados",
      },
    },
    fecha_orden: {
      type: DataTypes.DATE,
    },
    direccion: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "orden",
    tableName: "orden",
    timestamps: false,
  },
);

Orden.belongsTo(Usuario,{
    foreignKey: "usuario_fk",
    as: "usuario" 
});

Orden.belongsTo(Estados,{
    foreignKey: "estado_fk",
    as: "estados" 
});


export default Orden;
