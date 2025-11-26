// Importamos la conexión al pool de MySQL
const mysql = require("../database/mysql-pool");

// Función para validar que el ID sea un número entero positivo
function validateId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

const putRecipeId = async (req, res) => {  
    try {
        // Obtenemos el ID de la URL
        const { id } = req.params;

        // Obtenemos los datos enviados en el cuerpo de la petición
        const { name, ingredients, instructions } = req.body;

        // Validaciones básicas
        if (!validateId(id)) {
            return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
        }

        // Validación del nombre
        if (!name || typeof name !== "string" || name.length > 40) {
            return res.status(400).json({ error: "Nombre inválido." });
        }

        // Validación de los ingredientes
        if (!ingredients || typeof ingredients !== "string" || ingredients.length > 300) {
            return res.status(400).json({ error: "Ingredientes inválidos." });
        }

        // Validación de las instrucciones
        if (!instructions || typeof instructions !== "string") {
            return res.status(400).json({ error: "Instrucciones inválidas." });
        }

        // Consulta SQL para actualizar completamente la receta por ID
        const query = "UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id_recipe = ?";

        // Obtenemos conexión del pool
        const connection = await mysql.getConnection();

        // Ejecutamos la consulta con los datos enviados
        const result = await connection.query(query, [name, ingredients, instructions, id]);

        // Si no se modificó ninguna fila significa que la receta no existe
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: "Receta no encontrada." });
        }

        // Respuesta de éxito
        res.json({ message: "Receta modificada correctamente." });

    } catch (err) {
        // Error inesperado en el servidor
        res.status(500).send("Algo ha ido mal");
    }
};

// Exportamos la función para usarla en las rutas
module.exports = {
    putRecipeId,
};
