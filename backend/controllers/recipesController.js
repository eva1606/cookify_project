// backend/controllers/recipesController.js
const Recipe = require('../models/recipeModel');

exports.getAllRecipes = (req, res) => {
  Recipe.getAllRecipes((err, recipes) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(recipes);
  });
};
