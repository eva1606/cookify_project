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
        const [rows] = await pool.query('SELECT * FROM dbShnkr24stud.tbl_102_trendingnow');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
