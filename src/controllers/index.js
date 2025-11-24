const express = require("express");
const cors = require("cors");
const mysql = require("../database/mysql-pool");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const { getRecipes } = require("./getRecipes");
const { getchRecipeId } = require("./getRecipeId");
const { postRecipe } = require("./postRecipe");
const { putRecipeId } = require("./putRecipeId");
const { patchRecipeId } = require("./patchRecipeId");

module.exports = {
    getRecipes,
    getchRecipeId,
    postRecipe,
    putRecipeId,
    patchRecipeId
};








