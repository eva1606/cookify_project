const MyRecipes = require('../models/myrecipesModel');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await MyRecipes.getAll();
        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await MyRecipes.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }
        res.json({ recipe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};