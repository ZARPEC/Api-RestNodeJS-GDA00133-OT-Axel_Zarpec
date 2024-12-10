const dbConfig ={
    user: 'zarpec1',
    password: 'hola',
    server: 'localhost',
    port: 1433,
    database: 'GDA00133-OT_Axel-Zarpec',
    dialect: 'mssql',
    options:{
        encrypt: true,
        trustServerCertificate: true,
        trustedConnection: true,
    },
};

export default dbConfig;