const express = require("express");
const cors = require("cors");
const { getRecipes, getRecipeId, postRecipe, putRecipeId, patchRecipeId } = require("./controllers");
// const mysql = require("../database/mysql-pool");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get("/recipes", getRecipes);
app.get("/recipe/:id", getRecipeId);
app.post("/recipe", postRecipe);
app.put("/recipe/:id", putRecipeId);
app.patch("/delete/:id", patchRecipeId);





