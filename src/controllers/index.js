const { getRecipes } = require("./get-recipes");
const { getRecipeId } = require("./get-recipeId");
const { postRecipe } = require("./post-recipe");
const { putRecipeId } = require("./put-recipeId");
const { patchRecipeId } = require("./patch-recipeId");

module.exports = {
    getRecipes,
    getRecipeId,
    postRecipe,
    putRecipeId,
    patchRecipeId,
};
