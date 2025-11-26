//INDEX BY SRC

// Importamos Express, que nos permite crear un servidor web
const express = require("express");

// Importamos CORS para permitir peticiones desde otros orígenes
const cors = require("cors");

// Importamos las funciones que manejarán cada ruta
const { getRecipes, getRecipeId, postRecipe, putRecipeId, patchRecipeId } = require("./controllers");

const app = express(); // Creamos la aplicación de Express
const port = 3000; // Puerto donde escuchará el servidor

// Cargamos las variables de entorno del archivo .env
require("dotenv").config();

// Middleware para que Express pueda leer JSON en el cuerpo de las peticiones
// El límite se establece en 25 MB
app.use(express.json({ limit: "25mb" }));

// Activamos CORS para permitir peticiones externas
app.use(cors());

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Rutas de la API
// Obtener todas las recetas
app.get("/recipes", getRecipes);

// Obtener una receta por su ID
app.get("/recipe/:id", getRecipeId);

// Crear una nueva receta
app.post("/recipe", postRecipe);

// Reemplazar completamente una receta por ID
app.put("/recipe/:id", putRecipeId);

// Marcar como eliminada una receta o realizar una actualización parcial
app.patch("/delete/:id", patchRecipeId);





