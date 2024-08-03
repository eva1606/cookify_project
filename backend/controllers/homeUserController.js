const pool = require('../config/database');

exports.getAllRecipesForYou = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM dbShnkr24stud.tbl_102_recipes_foryou');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTrendingRecipes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM dbShnkr24stud.tbl_102_recipes_trendingnow');
        console.log('Trending Recipes:', rows);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching Trending recipes:', err);
        console.log('Error details:', err); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
