//INDEX DE CARPETA CONTROLLERS

// Importamos cada uno de los controladores desde sus archivos correspondientes
const { getRecipes } = require("./get-recipes");
const { getRecipeId } = require("./get-recipeId");
const { postRecipe } = require("./post-recipe");
const { putRecipeId } = require("./put-recipeId");
const { patchRecipeId } = require("./patch-recipeId");

// Exportamos todos los controladores juntos en un solo objeto
// Esto permite importarlos fácilmente desde otros archivos
module.exports = {
    getRecipes,     // Controlador para obtener todas las recetas
    getRecipeId,    // Controlador para obtener una receta por ID
    postRecipe,     // Controlador para crear una nueva receta
    putRecipeId,    // Controlador para reemplazar una receta completa por ID
    patchRecipeId,  // Controlador para actualizar parcialmente o marcar como eliminada
};
