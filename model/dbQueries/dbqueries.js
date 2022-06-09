require('dotenv').config();

const { Pool } = require('pg');

const pool = new  Pool();

const answersList = (question_id, page, count) => {
  count < 1 ? count = 1 : count;
  page < 1 ? page = 1 : page;
  const start = count * (page - 1);

  const ans =  `SELECT *,
  (SELECT JSON_agg(answers_photos) FROM answers_photos WHERE answers.id = answers_photos.answer_id) AS PICS
  FROM answers
  WHERE answers.question_id = $1 LIMIT $2 OFFSET $3`;

  const args = [question_id, count, start];

  return pool.query(ans, args);
}

const listQuestions = (product_id, page, count) => {
  count < 1 ? count = 1 : count;
  page < 1 ? page = 1 : page;
  const start = count * (page - 1);

  const quest = `SELECT *,
  (SELECT JSON_object_agg(fullans.id, fullans)
  FROM
    (SELECT *,
      (SELECT JSON_agg(answers_photos) FROM answers_photos WHERE answers.id = answers_photos.answer_id) AS PICS
    FROM answers
    WHERE questions.id = answers.question_id) AS fullans) AS answers
  FROM questions WHERE product_id=$1 LIMIT $2 OFFSET $3`;


  const args = [product_id, count, start];

  return pool.query(quest, args);
};



module.exports = {
  listQuestions,
  answersList,
};
