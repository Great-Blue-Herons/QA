require('dotenv').config();
const { Pool } = require('pg');
const { getAllQuestions, getAllAnswers, postQuestion, postAnswer, voteHelpfulQuestion, voteHelpfulAnswer, reportQuestion, reportAnswer } = require('./queries.js');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS
});


const getAllQs = function (product_id, page, count, offset) {
  return pool.query(getAllQuestions, [ product_id, page, count, offset ])
    .then((data) => {
      return data.rows[0].results;
    });
}

const getAllAs = function (question_id, page, count, offset) {
  return pool.query(getAllAnswers, [question_id, page, count, offset])
    .then((data) => {
      return data.rows[0].results;
    });
}

const postQ = function (body, name, email, product_id) {
  return pool.query(postQuestion, [body, name, email, product_id]);
}

const postA = function (body, name, email, question_id, photos) {
  return pool.query(postAnswer, [body, name, email, question_id, photos]);
}

const voteHelpfulQ = function (question_id) {
  return pool.query(voteHelpfulQuestion, [question_id]);
}

const reportQ = function (question_id) {
  return pool.query(reportQuestion, [question_id]);
}

const voteHelpfulA = function (answer_id) {
  return pool.query(voteHelpfulAnswer, [answer_id])
}

const reportA = function (answer_id) {
  return pool.query(reportAnswer, [answer_id]);
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