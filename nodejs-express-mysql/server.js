// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const server = express();
server.use(bodyParser.json());
server.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'schoolDB',
});

db.connect((error) => {
    if (error) {
        console.log('Error connecting to DB');
    } else {
        console.log('Successfully connected to DB');
    }
});

// CRUD operations

server.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (error, result) => {
        if (error) {
            res.send({ status: false, message: 'Error fetching students' });
        } else {
            res.send({ status: true, data: result });
        }
    });
});

server.post('/api/students/add', (req, res) => {
    const student = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee,
    };
    const sql = 'INSERT INTO students SET ?';
    db.query(sql, student, (error) => {
        if (error) {
            res.send({ status: false, message: 'Student creation failed' });
        } else {
            res.send({ status: true, message: 'Student created successfully' });
        }
    });
});

server.put('/api/students/update/:id', (req, res) => {
    const sql = 'UPDATE students SET ? WHERE id = ?';
    const student = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee,
    };
    db.query(sql, [student, req.params.id], (error) => {
        if (error) {
            res.send({ status: false, message: 'Student update failed' });
        } else {
            res.send({ status: true, message: 'Student updated successfully' });
        }
    });
});

server.delete('/api/students/delete/:id', (req, res) => {
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, req.params.id, (error) => {
        if (error) {
            res.send({ status: false, message: 'Student deletion failed' });
        } else {
            res.send({ status: true, message: 'Student deleted successfully' });
        }
    });
});

const port = 9002;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
