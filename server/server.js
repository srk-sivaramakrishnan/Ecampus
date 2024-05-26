const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shapna0327.',
  database: 'ecampus'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected...');
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { rollno, password } = req.body;
  
  if (!rollno || !password) {
    return res.status(400).send({ message: 'Roll number and password are required' });
  }

  const query = `SELECT * FROM students WHERE rollno = ? AND password = ?`;

  connection.query(query, [rollno, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send({ message: 'Server error', error: err });
    }

    if (results.length === 0) {
      console.log('Invalid credentials for roll number:', rollno);
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    res.status(200).send({ message: 'Login successful', user: results[0] });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));