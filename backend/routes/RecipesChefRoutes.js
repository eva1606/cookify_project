const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const recipesChefController = require('../controllers/recipesChefController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsPath = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath);
        }
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image_url'), recipesChefController.addRecipe);
router.get('/:chefId', recipesChefController.getRecipesByChef);
router.delete('/:id', recipesChefController.deleteRecipe);
router.put('/:id', upload.single('image_url'), recipesChefController.updateRecipe);

module.exports = router;
