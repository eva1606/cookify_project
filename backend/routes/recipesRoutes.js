// backend/routes/recipesRoutes.js
const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.get('/recipes', recipesController.getAllRecipes);

module.exports = router;
