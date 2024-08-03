const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const loginRoutes = require('./routes/loginRoutes');
const homeUserRoutes = require('./routes/homeUserRoutes');
const chefRoutes = require('./routes/RecipesChefRoutes'); // Chemin corrigé

app.use('/api/auth', loginRoutes);  
app.use('/api', homeUserRoutes);
app.use('/api/chef', chefRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
