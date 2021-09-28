require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'employee_manager',
      
  },
  console.log('Welcome to Employee Manager!!!')
  );

 
module.exports = db;