const express = require("express");
const cors = require("cors");
const mysql = require("./database/mysql-pool");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


// Función auxiliar para validar ID
function validateId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

// GET todas las recetas
app.get("/recipes", async (req, res) => {
    try {
        const query = "SELECT * FROM recipes";
        const connection = await mysql.getConnection();
        const data = await connection.query(query);
        res.json(data[0]);
    } catch (err) {
        res.status(500).send("Algo ha ido mal");
    }
});

// GET una receta específica
app.get("/recipe/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!validateId(id)) {
            return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
        }

        const query = "SELECT * FROM recipes WHERE id_recipe = ?";
        const connection = await mysql.getConnection();
        const data = await connection.query(query, [id]);

        if (data[0].length === 0) {
            return res.status(404).json({ error: "Receta no encontrada." });
        }

        res.json(data[0][0]);
    } catch (err) {
        res.status(500).send("Algo ha ido mal");
    }
});

// POST crear receta
app.post("/recipe", async (req, res) => {
    try {
        const { name, ingredients, instructions } = req.body;

        // Validación
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
});

// PUT actualizar receta
app.put("/recipe/:id", async (req, res) => {
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
});

// PATCH eliminar receta (marcar deleted_at)
app.patch("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!validateId(id)) {
            return res.status(400).json({ error: "El ID debe ser un número entero positivo." });
        }

        const query = "UPDATE recipes SET deleted_at = NOW() WHERE id_recipe = ?";
        const connection = await mysql.getConnection();
        const result = await connection.query(query, [id]);

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: "Receta no encontrada." });
        }

        res.json({ message: "Receta eliminada correctamente." });
    } catch (err) {
        res.status(500).send("Algo ha ido mal");
    }
});
