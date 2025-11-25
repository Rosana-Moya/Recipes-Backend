const mysql = require("../database/mysql-pool");

const getRecipes = async (req, res) => {
  try {
    const query = "SELECT * FROM recipes WHERE deleted_at IS NULL";
    const connection = await mysql.getConnection();
    const [data] = await connection.query(query);
   

    res.json(data);
  } catch (err) {
    console.error("Error al obtener recetas:", err);
    res.status(400).json({ error: "No se han podido obtener las recetas" });
  }
};

module.exports = {
  getRecipes,
};
