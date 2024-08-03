const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.json());


app.use(express.static(path.join(__dirname, '../frontend')));


const loginRoutes = require('./routes/loginRoutes');
const homeUserRoutes = require('./routes/homeUserRoutes');


app.use('/api/auth', loginRoutes);  
app.use('/api', homeUserRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
