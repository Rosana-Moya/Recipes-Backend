// Importamos la conexión al pool de MySQL
const mysql = require("../database/mysql-pool");

const postRecipe = async (req, res) => {    
    try {
        // Extraemos los campos enviados en el cuerpo de la petición
        const { name, ingredients, instructions } = req.body;

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

        // Consulta SQL para crear una nueva receta
        const query = "INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)";

        // Obtenemos la conexión del pool
        const connection = await mysql.getConnection();

        // Ejecutamos la consulta con los valores recibidos
        await connection.query(query, [name, ingredients, instructions]);

        // Respondemos con un status 201 (creado) y un mensaje
        res.status(201).json({ message: "Receta creada correctamente." });

    } catch (err) {
        // Error inesperado en el servidor
        res.status(500).send("Algo ha ido mal");
    }
};

// Exportamos la función para usarla en las rutas
module.exports = {
    postRecipe,
};
