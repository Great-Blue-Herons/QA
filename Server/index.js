const express = require('express');
const app = express();
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DB_PORT,
});

// middleware
app.use(express.json());

// routes
app.get('/qa/questions', (req, res) => {
  pool.query(`SELECT *
  FROM questions q
  LEFT JOIN answers an
  ON (q.id = an.question_id)
  LEFT JOIN answers_photos ap
  ON (ap.answer_id = an.id)
  WHERE q.product_id = ${req.query.product_id};`)
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => {throw err});
});



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});