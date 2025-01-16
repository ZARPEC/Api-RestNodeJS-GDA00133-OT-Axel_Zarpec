import { Sequelize, Op } from "sequelize";


const dbConfig ={
    username: 'zarpec1',
    password: 'hola',
    host: 'localhost',
    port: 1433,
    database: 'GDA00133-OT_Axel-Zarpec',
    dialect: 'mssql',
    dialectOptions:{
        encrypt: true,
        trustServerCertificate: true,
        trustedConnection: true,
    },
};

const sequelize = new Sequelize(
  dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port : dbConfig.port,
  dialect: dbConfig.dialect,
  logging: false,
  }
);

export default sequelize;
