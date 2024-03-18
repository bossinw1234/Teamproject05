const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 3080;
const mysql = require('mysql');

// ตั้งค่าการเชื่อมต่อกับ MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'healthyfooddb' // ชื่อของฐานข้อมูลที่คุณต้องการใช้
});

// เชื่อมต่อกับ MySQL Database
connection.connect();

// กำหนดเส้นทางสำหรับการดึงข้อมูลเมนูไก่
app.get('/api/chicken', (req, res) => {
  connection.query('SELECT * FROM menu', (error, results) => {
    if (error) {
      console.error('Error fetching chicken menu:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

