const mysql = require("../database/mysql-pool");

function validateId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

const putRecipeId = async (req, res) => {  //app.put("/recipe/:id",
    try {
        const { id } = req.params;
        const { name, ingredients, instructions } = req.body;

        if (!validateId(id)) {
            return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
        }
        if (!name || typeof name !== "string" || name.length > 40) {
            return res.status(400).json({ error: "Nombre inválido." });
        }
        if (!ingredients || typeof ingredients !== "string" || ingredients.length > 300) {
            return res.status(400).json({ error: "Ingredientes inválidos." });
        }
        if (!instructions || typeof instructions !== "string") {
            return res.status(400).json({ error: "Instrucciones inválidas." });
        }

        const query = "UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id_recipe = ?";
        const connection = await mysql.getConnection();
        const result = await connection.query(query, [name, ingredients, instructions, id]);

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: "Receta no encontrada." });
        }

        res.json({ message: "Receta modificada correctamente." });
    } catch (err) {
        res.status(500).send("Algo ha ido mal");
    }
};

module.exports = {
    putRecipeId,
};