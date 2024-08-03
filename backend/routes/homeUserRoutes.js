const express = require('express');
const router = express.Router();
const homeUserController = require('../controllers/homeUserController');


router.get('/recipes-foryou', homeUserController.getAllRecipesForYou);


router.get('/recipes-trendingnow', homeUserController.getTrendingRecipes);

module.exports = router;
