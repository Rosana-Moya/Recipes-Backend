const mysql = require("../database/mysql-pool");

const postRecipe = async (req, res) => {    //app.post("/recipe",
    try {
        const { name, ingredients, instructions } = req.body;

        if (!name || typeof name !== "string" || name.length > 40) {
            return res.status(400).json({ error: "Nombre inválido." });
        }
        if (!ingredients || typeof ingredients !== "string" || ingredients.length > 300) {
            return res.status(400).json({ error: "Ingredientes inválidos." });
        }
        if (!instructions || typeof instructions !== "string") {
            return res.status(400).json({ error: "Instrucciones inválidas." });
        }

        const query = "INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)";
        const connection = await mysql.getConnection();
        await connection.query(query, [name, ingredients, instructions]);

        res.status(201).json({ message: "Receta creada correctamente." });
    } catch (err) {
        res.status(500).send("Algo ha ido mal");
    }
};

module.exports = {
    postRecipe,
};