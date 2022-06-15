const express = require('express');
const { getAllQs, getAllAs, postQ, postA, voteHelpfulQ, voteHelpfulA, reportQ, reportA } = require('../Database/index.js');
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
      res.sendStatus(500);
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
      res.sendStatus(500);
    });
});

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
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let photos = req.body.photos;
  let question_id = req.params.question_id;

  postA(body, name, email, question_id, photos)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error posting answer to db', err);
      res.sendStatus(500);
    })
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let question_id = req.params.question_id;

  voteHelpfulQ(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error voting question helpful', err);
      res.sendStatus(500);
    })
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  let question_id = req.params.question_id;

  reportQ(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error reporting question', err);
      res.sendStatus(500);
    })
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let answer_id = req.params.answer_id;

  voteHelpfulA(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error voting answer helpful', err);
      res.sendStatus(500);
    })
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  let answer_id = req.params.answer_id;

  reportA(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error reporting answer', err);
      res.sendStatus(500);
    })
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get(`/${process.env.LOADER}`, (req, res) => {
  res.send(process.env.LOADER);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});