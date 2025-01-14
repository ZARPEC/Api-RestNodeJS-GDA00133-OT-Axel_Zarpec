import {Model, DataTypes} from 'sequelize';
import sequelize from '../../config/dbConfig.mjs';

class Estado extends Model {}

Estado.init({
    idEstados: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreEstado: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'estados',
    tableName: 'estados',
    timestamps: false
})

export default Estado;