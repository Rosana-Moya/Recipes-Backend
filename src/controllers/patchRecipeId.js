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

module.exports = {
    patchRecipeId,
};
