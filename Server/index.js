const express = require('express');
const { getAllQs } = require('../Database/index.js');
const app = express();

// middleware
app.use(express.json());

// routes
app.get('/qa/questions', (req, res) => {

  let product_id = req.query.product_id;
  let page = req.params.page || 1;
  let count = req.params.count || 5;

  getAllQs(product_id, page, count)
    .then((questions) => {
      res.json(questions);
    })
    .catch(err => {
      console.log('error fetching questions', err);
      res.statusCode(500);
    });
});



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});