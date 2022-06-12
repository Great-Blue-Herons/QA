const express = require('express');
const { getAllQs, getAllAs, postQ } = require('../Database/index.js');
const app = express();

// middleware
app.use(express.json());

// routes
app.get('/qa/questions', (req, res) => {

  let product_id = req.query.product_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let offset = (page -1) * count;

  getAllQs(product_id, page, count, offset)
    .then((questions) => {
      res.json(questions);
    })
    .catch(err => {
      console.log('error fetching questions', err);
      res.statusCode(500);
    });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = req.params.question_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let offset = (page -1) * count;

  getAllAs(question_id, page, count, offset)
    .then((answers) => {
      res.json(answers);
    })
    .catch(err => {
      console.log('error fetching answers', err);
      res.statusCode(500);
    });
})

app.post('/qa/questions', (req, res) => {
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let product_id = req.body.product_id;

  postQ(body, name, email, product_id)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error posting question to db', err);
      res.sendStatus(500);
    })
})



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});