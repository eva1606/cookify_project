const express = require('express');
const router = express.Router();
const viewmyrecipesController = require('../controllers/viewmyrecipesController');

router.get('/recipes', viewmyrecipesController.getAllRecipes);
router.get('/recipe/:id', viewmyrecipesController.getRecipeById);

module.exports = router;