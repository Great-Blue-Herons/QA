require('dotenv').config();
const { Pool } = require('pg');
const { getAllQuestions, getAllAnswers, postQuestion, postAnswer, voteHelpfulQuestion, voteHelpfulAnswer, reportQuestion, reportAnswer } = require('./queries.js');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DB_PORT,
  max: 80,
});


const getAllQs = function (product_id, page, count, offset) {
  // return pool.connect()
  //   .then((client) => {
      return pool.query(getAllQuestions, [ product_id, page, count, offset ])
        .then((data) => {
          // pool.release();
          return data.rows[0].results;
        })
        .catch((err) => {
          // pool.release();
        });
    // })
}

const getAllAs = function (question_id, page, count, offset) {
  // return pool.connect()
  //   .then((client) => {
      return pool.query(getAllAnswers, [question_id, page, count, offset])
        .then((data) => {
          // client.release();
          return data.rows[0].results;
        });
        // .catch((err) => {
        //   // client.release();
        // });
//     })
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
        });
    })
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
      });
  })
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
      });
  })
}

const reportQ = function (question_id) {
  return pool.connect()
  .then((client) => {
    return client.query(reportQuestion, [question_id])
      .then((data) => {
        client.release();
      })
      .catch((err) => {
        client.release();
      });
  })
}

const voteHelpfulA = function (answer_id) {
  return pool.connect()
  .then((client) => {
    return client.query(voteHelpfulAnswer, [answer_id])
      .then((data) => {
        client.release();
      })
      .catch((err) => {
        client.release();
      });
  })
}

const reportA = function (answer_id) {
  return pool.connect()
  .then((client) => {
    return client.query(reportAnswer, [answer_id])
      .then((data) => {
        client.release();
      })
      .catch((err) => {
        client.release();
      });
  })
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