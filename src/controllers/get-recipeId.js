// Importamos la conexión al pool de MySQL
const mysql = require("../database/mysql-pool");

// Función para validar que el ID sea un número entero positivo
function validateId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

const getRecipeId = async (req, res) => {
    try {
        // Extraemos el ID de los parámetros de la URL
        const { id } = req.params;

        // Validamos que el ID sea correcto
        if (!validateId(id)) {
            return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
        }

        // Consulta SQL para obtener la receta por su ID
        const query = "SELECT * FROM recipes WHERE id_recipe = ?";

        // Obtenemos una conexión del pool
        const connection = await mysql.getConnection();

        // Ejecutamos la consulta pasando el ID como parámetro
        const data = await connection.query(query, [id]);

        // Si no se encuentra ninguna receta con ese ID
        if (data[0].length === 0) {
            return res.status(404).json({ error: "Receta no encontrada." });
        }

        // Devolvemos la receta encontrada
        res.json(data[0][0]);

    } catch (err) {
        // Error inesperado en el servidor
        res.status(500).send("Algo ha ido mal");
    }
};

// Exportamos la función para usarla desde las rutas
module.exports = {
    getRecipeId,
};
