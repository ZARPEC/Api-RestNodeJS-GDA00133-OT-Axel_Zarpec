import {Model, DataTypes} from 'sequelize';
import sequelize from '../../config/dbConfig.mjs';

class UnidadMedida extends Model {}

UnidadMedida.init({
    idUnidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    unidad: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'unidad_medida',
    tableName: 'unidad_medida',
    timestamps: false
})

export default UnidadMedida;