import {Model, DataTypes} from 'sequelize';
import sequelize from '../../config/dbConfig.mjs';

class Cliente extends Model {}

Cliente.init({
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    razon_social: {
        type: DataTypes.STRING
    },
    nombre_comercial: {
        type: DataTypes.STRING
    },
    direccion_entrega: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'cliente',
    tableName: 'cliente',
    timestamps: false

})

export default Cliente;