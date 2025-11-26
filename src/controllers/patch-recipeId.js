// Importamos la conexión al pool de MySQL
const mysql = require("../database/mysql-pool");

// Función para validar que el ID sea un número entero positivo
function validateId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

const patchRecipeId = async (req, res) => {   
    try {
        // Obtenemos el ID desde los parámetros de la URL
        const { id } = req.params;

        // Validamos que el ID sea correcto
        if (!validateId(id)) {
            return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
        }

        // Consulta SQL para marcar una receta como eliminada
        // En vez de borrar, actualiza el campo deleted_at con la fecha actual
        const query = "UPDATE recipes SET deleted_at = NOW() WHERE id_recipe = ?";

        // Obtenemos una conexión del pool
        const connection = await mysql.getConnection();

        // Ejecutamos la actualización con el ID recibido
        const result = await connection.query(query, [id]);

        // Si no se modificó ninguna fila, la receta no existe
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: "Receta no encontrada." });
        }

        // Respuesta de éxito
        res.json({ message: "Receta eliminada correctamente." });

    } catch (err) {
        // Mostramos el error en consola y respondemos con error del servidor
        console.log(err);
        res.status(500).send("Algo ha ido mal");
    }
};

// Exportamos la función para usarla en las rutas
module.exports = {
    patchRecipeId,
};
