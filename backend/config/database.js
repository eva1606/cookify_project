const path = require('path');  
require('dotenv').config({ path: path.join(__dirname, '../.env') }); 
const mysql = require('mysql2/promise');

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.getConnection()
   .then(connection => {
       console.log('Connected to MySQL Database');
       connection.release(); 
   })
   .catch(err => {
       console.error('Error connecting to the database:', err.message);
   });

module.exports = pool;
