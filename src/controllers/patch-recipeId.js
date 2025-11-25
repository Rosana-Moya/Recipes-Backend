const mysql = require("../database/mysql-pool");

function validateId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

const patchRecipeId = async (req, res) => {   //app.patch("/delete/:id",
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
        console.log(err);
        res.status(500).send("Algo ha ido mal");
    }
};

module.exports = {
    patchRecipeId,
};
