
const express = require('express');
const router = express.Router();
const pantryController = require('../controllers/pantryController');

// Route pour ajouter des ingrédients à la pantry
router.post('/pantry', pantryController.addIngredientsToPantry);

// Route pour récupérer les données de la pantry
router.get('/pantry', pantryController.getPantryData);

// Route pour supprimer un ingrédient par ID
router.delete('/pantry/ingredient/:id', pantryController.deleteIngredientById);

// Route pour supprimer un repas par ID
router.delete('/pantry/meal/:id', pantryController.deleteMealById);

module.exports = router;