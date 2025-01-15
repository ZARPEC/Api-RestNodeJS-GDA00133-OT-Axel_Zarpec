import {Model, DataTypes} from 'sequelize';
import Estado from './estados.js';
import Rol from './rol.js';
import Cliente from './Cliente.js';
import sequelize from '../../config/dbConfig.mjs';

class Usuario extends Model {}

Usuario.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol_fk: {
        type: DataTypes.STRING,
        references:{
            model: 'Rol',
            key: 'idRol'
        }
    },
    estados_fk: {
        type: DataTypes.STRING,
        references:{
            model: 'Estado',
            key: 'idEstado'
        }
    },
    email: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    fecha_nacimiento: {
        type: DataTypes.DATE
    },
    fecha_creacion: {
        type: DataTypes.DATE
    },
    Cliente_fk:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Cliente',
            key: 'idCliente'
        }
    }

},{
    sequelize,
    modelName: 'Usuarios',
    tableName: 'Usuarios',
    timestamps: false
})

Usuario.belongsTo(Estado, {
    foreignKey: 'estados_fk',
    as: 'estadofk'
})

Usuario.belongsTo(Rol,{
    foreignKey: 'rol_fk',
    as: 'rolfk'
})

Usuario.belongsTo(Cliente,{
    foreignKey: 'Cliente_fk',
    as: 'clientefk'
})

export default Usuario;