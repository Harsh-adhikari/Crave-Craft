const express = require('express');
const { 
    getRecipes, 
    getMyRecipes, 
    getFavoriteRecipes,
    toggleLike,
    getRecipe, 
    addRecipe, 
    editRecipe, 
    deleteRecipe, 
    upload 
} = require('../controller/recipe');
const verifyToken = require("../middleware/auth");
const router = express.Router();

// IMPORTANT: Order matters! Specific routes must come before parameterized routes
router.get("/", getRecipes); // Get all recipes (public - for home page)
router.get("/my", verifyToken, getMyRecipes); // Get only user's recipes (protected)
router.get("/user/favorites", verifyToken, getFavoriteRecipes); // Get user's favorite recipes
router.post("/:id/favorite", verifyToken, toggleLike); // Toggle like/unlike on a recipe
router.get("/:id", getRecipe); // Get recipe by id
router.post("/", upload.single('file'), verifyToken, addRecipe); // Add recipe
router.put("/:id", upload.single('file'), editRecipe); // Edit recipe
router.delete("/:id", deleteRecipe); // Delete recipe

module.exports = router;
