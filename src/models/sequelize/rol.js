import {Model, DataTypes} from 'sequelize';
import sequelize from '../../config/dbConfig.mjs';

class Rol extends Model {}

Rol.init({
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreRol: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'Rol',
    tableName: 'Rol',
    timestamps: false
})

export default Rol;