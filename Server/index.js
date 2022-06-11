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
  pool.connect()
  .then((client) => {
    client.query(`
    SELECT
    json_build_object (
        'product_id', $1::bigint,
        'results', json_agg(
            json_build_object(
                'question_id', q.id,
                'question_body', q.body,
                'date_written', q.date_written,
                'asker_name', q.asker_name,
                'question_helpfulness', q.helpful,
                'reported', q.reported,
                'answers', (SELECT
                            CASE WHEN COUNT(an.id) != 0 THEN
                    json_object_agg( an.id,
                        json_build_object(
                            'id', an.id,
                            'body', an.body,
                            'date', an.date_written,
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
                    FROM answers an
                    WHERE an.question_id = q.id AND an.reported = 0
                )
            )
        )
    ) results
    FROM questions q
    WHERE q.product_id = $1::bigint AND q.reported = 0;`, [req.query.product_id])
    .then(data => {
      client.release();
      res.json(data.rows[0].results);
    })
  })
  .catch(err => {console.log(err)
   res.statusCode(500);
  });
});



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});