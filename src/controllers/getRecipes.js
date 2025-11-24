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

module.exports = {
    getRecipes,
};