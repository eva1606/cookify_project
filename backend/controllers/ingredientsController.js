const pool = require('../config/database.js');

const addIngredient = async (req, res) => {
    const { name, quantity, unit, recipe_id } = req.body;

    console.log('Received ingredient data:', { name, quantity, unit, recipe_id });

    if (!name || !quantity || !unit || !recipe_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO dbShnkr24stud.tbl_102_ingredients (name, quantity, unit, recipe_id) VALUES (?, ?, ?, ?)',
            [name, quantity, unit, recipe_id]
        );
        res.status(201).json({ message: 'Ingredient added successfully', ingredientId: result.insertId });
    } catch (error) {
        console.error('Error adding ingredient:', error);
        res.status(500).json({ error: error.message });
    }
};

const getAllIngredients = async (req, res) => {
    try {
        const [ingredients] = await pool.execute('SELECT * FROM dbShnkr24stud.tbl_102_ingredients');
        res.json(ingredients);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ error: error.message });
    }
};

const getIngredientById = async (req, res) => {
    const { id } = req.params;
    try {
        const [ingredient] = await pool.execute('SELECT * FROM dbShnkr24stud.tbl_102_ingredients WHERE ingredient_id = ?', [id]);
        if (ingredient.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.json(ingredient[0]);
    } catch (error) {
        console.error('Error fetching ingredient:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateIngredient = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, unit, recipe_id } = req.body;
    try {
        await pool.execute(
            'UPDATE dbShnkr24stud.tbl_102_ingredients SET name = ?, quantity = ?, unit = ?, recipe_id = ? WHERE ingredient_id = ?',
            [name, quantity, unit, recipe_id, id]
        );
        res.json({ message: 'Ingredient updated successfully' });
    } catch (error) {
        console.error('Error updating ingredient:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteIngredient = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM dbShnkr24stud.tbl_102_ingredients WHERE ingredient_id = ?', [id]);
        res.json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllIngredients,
    getIngredientById,
    addIngredient,
    updateIngredient,
    deleteIngredient
};
