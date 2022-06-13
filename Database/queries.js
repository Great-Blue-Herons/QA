const getAllQuestions = `
SELECT
json_build_object (
    'product_id', $1::bigint,
    'page', $2::bigint,
    'count', $3::bigint,
    'results', json_agg(
        json_build_object(
            'question_id', q.id,
            'question_body', q.body,
            'date_written', to_timestamp(q.date_written),
            'asker_name', q.asker_name,
            'question_helpfulness', q.helpful,
            'reported', q.reported,
            'answers', (SELECT
                        CASE WHEN COUNT(an.id) != 0 THEN
                json_object_agg( an.id,
                    json_build_object(
                        'id', an.id,
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
                FROM answers an
                WHERE an.question_id = q.id AND an.reported = 0
            )
        )
    )
) results
FROM
(
  SELECT
  qu.id,
  qu.body,
  qu.date_written,
  qu.asker_name,
  qu.reported,
  qu.helpful
  FROM questions qu
  WHERE qu.product_id = $1::bigint AND qu.reported = 0
  OFFSET $4::bigint
  LIMIT $3::bigint
) q;
`;

const getAllAnswers = `
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
        FROM (
          SELECT
          ans.id,
          ans.body,
          ans.date_written,
          ans.answerer_name,
          ans.reported,
          ans.helpful
          FROM answers ans
          WHERE ans.question_id = $1::bigint AND ans.reported = 0
          OFFSET $4::bigint
          LIMIT $3::bigint
        ) an;
`;

const postQuestion = `
INSERT INTO questions (body, asker_name, asker_email, product_id)
VALUES ($1::text, $2::varchar, $3::varchar, $4::bigint)
`;

const postAnswer = `
WITH current_answer AS (
  INSERT INTO answers (body, answerer_name, answerer_email, question_id)
  VALUES ($1::text, $2::varchar, $3::varchar, $4::bigint) RETURNING id
)
INSERT INTO answers_photos (answer_id, url)
SELECT id, UNNEST($5::text[])
 FROM current_answer;
`;

const voteHelpfulQuestion = `
UPDATE questions
SET helpful = helpful + 1
WHERE id = $1::bigint;
`;


module.exports = {
  getAllQuestions,
  getAllAnswers,
  postQuestion,
  postAnswer,
  voteHelpfulQuestion,
}