require('dotenv').config();
const { Pool } = require('pg');
const { getAllQuestions } = require('./queries.js');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DB_PORT,
});


const getAllQs = function (product_id, page, count) {
  return pool.connect()
    .then((client) => {
      return client.query(getAllQuestions, [product_id, page, count, (page -1) * count])
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

const getAllAs = function (question_id, page, count) {
  return pool.connect()
    .then((client) => {
      return client.query(`
      SELECT
      json_build_object (
          'question_id', $1::bigint,
          'page', $2::bigint,
          'count', $3::bigint,
          'results', (
                    CASE WHEN COUNT(an.id) != 0 THEN
                      json_agg(
                          json_build_object(
                              'answer_id', an.id,
                              'body', an.body,
                              'date', to_timestamp(an.date_written),
                              'answerer_name', an.answerer_name,
                              'helpfulness', an.helpful,
                              'photos', ( SELECT
                                        CASE WHEN COUNT(ap.id) != 0 THEN
                                        json_agg(
                                            json_build_object(
                                                'id', ap.id,
                                                'url', ap.url
                                            ))
                                        ELSE '[]'::json END
                                        FROM answers_photos ap
                                        WHERE ap.answer_id = an.id

                                        )
                          )
                      ) ELSE '{}'::json END
                  )
              ) results
      FROM answers an
      WHERE an.question_id = $1::bigint AND an.reported = 0;
      `, [question_id, page, count])
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
      return client.query(`INSERT INTO questions (body, asker_name, asker_email, product_id) VALUES ($1::text, $2::varchar, $3::varchar, $4::bigint)
      `, [body, name, email, product_id])
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

const postA = function (question_id, body, name, email, photos) {
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

const helpfulQ = function (question_id) {
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

const helpfulA = function (answer_id) {
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
  helpfulQ,
  reportQ,
  helpfulA,
  reportA
}