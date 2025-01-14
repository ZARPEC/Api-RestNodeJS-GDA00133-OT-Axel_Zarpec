import {Model, DataTypes} from 'sequelize';
import sequelize from '../../config/dbConfig.mjs';
import Categoria from './categoria.js';

class Subcategoria extends Model {}

Subcategoria.init({
    idSubcategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subcategoria: {
        type: DataTypes.STRING
    },
    categoria_fk: {
        type: DataTypes.INTEGER,
        references:{
            model: 'Categoria',
            key: 'idCategoria'
        }
    }
},{
    sequelize,
    modelName: 'Subcategoria',
    tableName: 'Subcategoria',
    timestamps: false
})

Subcategoria.belongsTo(Categoria, {
    foreignKey: 'categoria_fk',
    as: 'categoria'
});

export default Subcategoria;