//Tip: Aunque aquí funciona, usar createConnection abre una conexión nueva cada vez. Para apps más grandes es recomendable usar un pool de conexiones (mysql.createPool) para mejorar el rendimiento y evitar saturar la base de datos.

// Importamos mysql2 con soporte de promesas
const mysql = require("mysql2/promise");

// Función para obtener una conexión a la base de datos
const getConnection = async () => {
    // Creamos la conexión usando los datos de configuración
    // Los valores de usuario y contraseña se toman del archivo .env
    const connection = await mysql.createConnection({
        host: "localhost",                // Host de la base de datos
        database: "recipessapp",          // Nombre de la base de datos
        user: process.env.USER_WORKBENCH, // Usuario (variable de entorno)
        password: process.env.PASSWORD_WORKBENCH, // Contraseña (variable de entorno)
    });

    // Conectamos a la base de datos
    await connection.connect();

    // Mostramos en consola que la conexión se ha establecido
    console.log(
        `Conexión establecida con la base de datos (identificador=${connection.threadId})`
    );

    // Retornamos la conexión para poder usarla en otros archivos
    return connection;
};

// Exportamos la función para usarla en los controladores
module.exports = {
    getConnection,
};
