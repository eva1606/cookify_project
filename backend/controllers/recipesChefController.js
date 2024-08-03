const pool = require('..config/database.js');

const addRecipe = async (req, res) => 
{
    const { chef_id, title, ingredients, instructions, time, conservation, difficulty, prepTime, cookTime } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Received data:', { chef_id, title, ingredients, instructions, image_url, time, conservation, difficulty, prepTime, cookTime });

    if (!chef_id || !title || !ingredients || !instructions || !time || !conservation || !difficulty || !prepTime || !cookTime) {
        console.error('Missing fields:', { chef_id, title, ingredients, instructions, image_url, time, conservation, difficulty, prepTime, cookTime });
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const parsedIngredients = JSON.parse(ingredients);

        const [user] = await pool.execute('SELECT * FROM dbShnkr24stud.tbl_102_users WHERE user_id = ?', [chef_id]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'Invalid chef_id' });
        }

        const [recipeResult] = await pool.execute(
            'INSERT INTO dbShnkr24stud.tbl_102_recipesbychef (chef_id, title, ingredients, instructions, image_url, time, conservation, difficulty, prepTime, cookTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [chef_id, title, JSON.stringify(parsedIngredients), instructions, image_url, time, conservation, difficulty, prepTime, cookTime]
        );

        res.status(201).json({ message: 'Recipe added successfully', recipeId: recipeResult.insertId });
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ error: error.message });
    }
};

const getRecipesByChef = async (req, res) => 
{
    
};

const deleteRecipe = async (req, res) => 
{
   
};

const updateRecipe = async (req, res) => 
{
    
};

module.exports = {
    addRecipe,
    getRecipesByChef,
    deleteRecipe,
    updateRecipe
};
