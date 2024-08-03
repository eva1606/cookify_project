const express = require('express');
const app = express();
const db = require('./config/database'); 

require('dotenv').config();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;