import {Model, DataTypes} from 'sequelize';
import sequelize from '../../config/dbConfig.mjs';
import productos from './productos.js';
import Ordensequelize from './orden.js';

class detallesOrden extends Model {}

detallesOrden.init({
    iddetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orden: {
        type: DataTypes.INTEGER,
        references:{
            model: Ordensequelize,
            key: 'idorden'
        }
    },
    producto_orden: {
        type: DataTypes.INTEGER,
        references:{
            model: 'productos',
            key: 'idProducto'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    
},{
    sequelize,
    modelName: 'DETALLES_ORDEN',
    tableName: 'DETALLES_ORDEN',
    timestamps: false
})

detallesOrden.belongsTo(Ordensequelize,{
    foreignKey: 'orden',
    as: 'ordenfk'
})

detallesOrden.belongsTo(productos,{
    foreignKey: 'producto_orden',
    as: 'productofk'
})


export default detallesOrden;

