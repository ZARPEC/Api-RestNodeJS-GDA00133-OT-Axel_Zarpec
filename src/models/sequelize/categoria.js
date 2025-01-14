import {Model, DataTypes} from 'sequelize';
import sequelize from '../../config/dbConfig.mjs';

class Categoria extends Model {}

Categoria.init({
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'Categoria_producto',
    tableName: 'Categoria_producto',
    timestamps: false
});

export default Categoria;