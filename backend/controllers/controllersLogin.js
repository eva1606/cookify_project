const pool = require('../config/database');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const [user] = await pool.execute('SELECT * FROM dbShnkr24stud.tbl_102_users WHERE username = ? AND password = ?', [username, password]);
        console.log('Database user result:', user);

        if (user.length === 0) {
            console.log('Invalid username or password:', { username, password });
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const loggedInUser = user[0];
        res.json({
            message: 'Login successful',
            userId: loggedInUser.user_id, 
            permission: loggedInUser.permission
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    login
};
