require('dotenv').config();
const { Pool } = require('pg');
const { getAllQuestions, getAllAnswers, postQuestion, postAnswer, voteHelpfulQuestion } = require('./queries.js');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DB_PORT,
});


const getAllQs = function (product_id, page, count, offset) {
  return pool.connect()
    .then((client) => {
      return client.query(getAllQuestions, [ product_id, page, count, offset ])
        .then((data) => {
          client.release();
          return data.rows[0].results;
        })
        .catch((err) => {
          client.release();
          console.log('error getting all questions', err);
        });
    })
    .catch((err) => {
      console.log('trouble connecting to db', err);
    });
}

const getAllAs = function (question_id, page, count, offset) {
  return pool.connect()
    .then((client) => {
      return client.query(getAllAnswers, [question_id, page, count, offset])
        .then((data) => {
          client.release();
          return data.rows[0].results;
        })
        .catch((err) => {
          client.release();
          console.log('error getting all answers', err);
        });
    })
    .catch((err) => {
      console.log('trouble connecting to db', err);
    });
}

const postQ = function (body, name, email, product_id) {
  return pool.connect()
    .then((client) => {
      return client.query(postQuestion, [body, name, email, product_id])
        .then(() => {
          client.release();
        })
        .catch((err) => {
          client.release();
          console.log('error posting question', err);
        });
    })
    .catch((err) => {
      console.log('trouble connecting to db', err);
    });
}

const postA = function (body, name, email, question_id, photos) {
  return pool.connect()
  .then((client) => {
    return client.query(postAnswer, [body, name, email, question_id, photos])
      .then((data) => {
        client.release();
      })
      .catch((err) => {
        client.release();
        console.log('error posting answer', err);
      });
  })
  .catch((err) => {
    console.log('trouble connecting to db', err);
  });
}

const voteHelpfulQ = function (question_id) {
  return pool.connect()
  .then((client) => {
    return client.query(voteHelpfulQuestion, [question_id])
      .then((data) => {
        client.release();
      })
      .catch((err) => {
        client.release();
        console.log('error getting all questions', err);
      });
  })
  .catch((err) => {
    console.log('trouble connecting to db', err);
  });
}

const reportQ = function (question_id) {
  return pool.connect()
  .then((client) => {
    return client.query(`
    `, [product_id])
      .then((data) => {
        client.release();
        return data.rows[0].results;
      })
      .catch((err) => {
        client.release();
        console.log('error getting all questions', err);
      });
  })
  .catch((err) => {
    console.log('trouble connecting to db', err);
  });
}

const voteHelpfulA = function (answer_id) {
  return pool.connect()
  .then((client) => {
    return client.query(`
    `, [product_id])
      .then((data) => {
        client.release();
        return data.rows[0].results;
      })
      .catch((err) => {
        client.release();
        console.log('error getting all questions', err);
      });
  })
  .catch((err) => {
    console.log('trouble connecting to db', err);
  });
}

const reportA = function (answer_id) {
  return pool.connect()
  .then((client) => {
    return client.query(`
    `, [product_id])
      .then((data) => {
        client.release();
        return data.rows[0].results;
      })
      .catch((err) => {
        client.release();
        console.log('error getting all questions', err);
      });
  })
  .catch((err) => {
    console.log('trouble connecting to db', err);
  });
}


module.exports = {
  getAllQs,
  getAllAs,
  postQ,
  postA,
  voteHelpfulQ,
  reportQ,
  voteHelpfulA,
  reportA
}