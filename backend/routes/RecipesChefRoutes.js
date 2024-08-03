const express = require('express');
const multer = require('multer');
const router = express.Router();
const recipesChefController = require('../controllers/recipesChefController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/recipes', upload.single('image_url'), recipesChefController.addRecipe);
router.get('/recipes/:chefId', recipesChefController.getRecipesByChef);
router.delete('/recipes/:id', recipesChefController.deleteRecipe);
router.put('/recipes/:id', upload.single('image_url'), recipesChefController.updateRecipe);

module.exports = router;
