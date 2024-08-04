const Pantry = require('../models/pantryModel');

exports.addIngredientsToPantry = async (req, res) => {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ message: 'Invalid ingredients data' });
    }

    try {
        await Pantry.addIngredients(ingredients);
        res.status(201).json({ message: 'Ingredients added to pantry' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPantryData = (req, res) => {
    Pantry.getPantryData((err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(data);
    });
};

exports.deleteIngredientById = (req, res) => {
    const ingredientId = req.params.id;
    Pantry.deleteIngredientById(ingredientId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Ingredient deleted', result });
    });
};

exports.deleteMealById = (req, res) => {
    const mealId = req.params.id;
    Pantry.deleteMealById(mealId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Meal deleted', result });
    });
};