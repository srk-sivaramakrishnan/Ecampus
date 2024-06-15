const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jimsha',
  database: 'ecampus'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected...');
});

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

// Helper function to process CSV and insert into database
const processCSV = (filePath, tableName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const query = `INSERT INTO \`${tableName}\` (rollno, password) VALUES ?`;
        const values = results.map(row => [row.rollno, row.password]);

        connection.query(query, [values], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
  });
};

// Upload student CSV
app.post('/api/upload-student', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  processCSV(filePath, 'student_login_details')
    .then(result => {
      fs.unlinkSync(filePath); // Delete the file after processing
      res.status(200).send({ message: 'Student data uploaded successfully', result });
    })
    .catch(err => {
      console.error('Error processing student CSV:', err);
      res.status(500).send({ message: 'Error processing CSV', error: err });
    });
});

// Upload faculty CSV
app.post('/api/upload-faculty', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  processCSV(filePath, 'faculty_login_details')
    .then(result => {
      fs.unlinkSync(filePath); // Delete the file after processing
      res.status(200).send({ message: 'Faculty data uploaded successfully', result });
    })
    .catch(err => {
      console.error('Error processing faculty CSV:', err);
      res.status(500).send({ message: 'Error processing CSV', error: err });
    });
});

// Login endpoint for students
app.post('/api/login', (req, res) => {
  const { rollno, password } = req.body;

  if (!rollno || !password) {
    return res.status(400).send({ message: 'Roll number and password are required' });
  }

  const query = `SELECT * FROM student_login_details WHERE rollno = ? AND password = ?`;

  connection.query(query, [rollno, password], (err, results) => {
    if (err) {
      console.error('Error querying student login details:', err);
      return res.status(500).send({ message: 'Server error', error: err });
    }

    if (results.length === 0) {
      console.log('Invalid credentials for roll number:', rollno);
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    res.status(200).send({ message: 'Login successful', user: results[0] });
  });
});

// Login endpoint for faculty
app.post('/api/faculty-login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  const query = `SELECT * FROM faculty_login_details WHERE username = ? AND password = ?`;

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying faculty login details:', err);
      return res.status(500).send({ message: 'Server error', error: err });
    }

    if (results.length === 0) {
      console.log('Invalid credentials for username:', username);
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    res.status(200).send({ message: 'Login successful', user: results[0] });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
