const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'myuser',
    password: 'mypassword',
    database: 'mydatabase'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API to get students
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/logs', (req, res) => {
  const query = 'SELECT * FROM `logs`';
  db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});
// API to post logs

app.post('/logs', (req, res)=>{
  const query = `INSERT INTO logs (id, name, _status) VALUES (${req.body.id}, '${req.body.name}', ${req.body._status})` ;
  db.query(query, (err) => {
      if (err) throw err;
      res.json({ message: 'Log pushed successfully' });
  });
});


// API to update status
app.put('/students/:id/status', (req, res) => {
    const studentId = req.params.id;
    const status = req.body.status;

    const query = 'UPDATE students SET _status = ? WHERE id = ?';
    db.query(query, [status, studentId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Status updated successfully' });
    });
});

// Start the server
app.listen(3000 , () => {
    console.log('Server is running on port 3000');
});
