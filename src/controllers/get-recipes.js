// Importamos la conexión a la base de datos desde el pool de MySQL
const mysql = require("../database/mysql-pool");

const getRecipes = async (req, res) => {
  try {
    // Consulta SQL para obtener todas las recetas que NO estén marcadas como eliminadas
    const query = "SELECT * FROM recipes WHERE deleted_at IS NULL";

    // Obtenemos una conexión del pool
    const connection = await mysql.getConnection();

    // Ejecutamos la consulta. "data" contiene el resultado de la base de datos
    const [data] = await connection.query(query);

    // Enviamos el resultado como respuesta en formato JSON
    res.json(data);

  } catch (err) {
    // Si ocurre un error, lo mostramos por consola para depuración
    console.error("Error al obtener recetas:", err);

    // Respondemos con un error al cliente
    res.status(400).json({ error: "No se han podido obtener las recetas" });
  }
};

// Exportamos la función para poder usarla en las rutas
module.exports = {
  getRecipes,
};
