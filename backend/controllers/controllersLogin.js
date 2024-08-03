const pool = require('../config/database');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await pool.execute('SELECT * FROM dbShnkr24stud.tbl_102_users WHERE username = ? AND password = ?', [username, password]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = users[0];
        console.log('Database user result:', user);

        res.json({
            user_id: user.user_id,
            permission: user.permission,
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    login
};
