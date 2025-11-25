const mysql = require("../database/mysql-pool");

function validateId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

const getRecipeId = async (req, res) => {
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
};

module.exports = {
    getRecipeId,
};