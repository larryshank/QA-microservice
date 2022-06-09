require('dotenv').config();

const { Pool } = require('pg');

const pool = new  Pool();

// const answersList = (question_id, page, count) => {
//   count < 1 ? count = 1 : count;
//   page < 1 ? page = 1 : page;
//   const start = count * (page - 1);

//   const ans = 'SELECT id, body, date_written, answerer_name, answerer_email, reported, helpful WHERE question_id = $1 LIMIT $2 OFFSET $3';

//   const args = [question_id, page, count];

//   return pool.query(ans, args);
// }

// const listQuestions = (product_id, page, count) => {
//   count < 1 ? count = 1 : count;
//   page < 1 ? page = 1 : page;
//   const start = count * (page - 1);

//   const quest = 'SELECT id, body, date_written, asker_name, asker_email, helpful, reported FROM questions WHERE product_id=$1 LIMIT $2 OFFSET $3';

//   const args = [product_id, count, start]

//   return pool.query(quest, args);
// };

// const quest = 'EXPLAIN ANALYZE SELECT *, (SELECT JSON_object_agg(answers.id, row_to_json(answers)) from answers WHERE questions.id = answers.question_id) answers FROM questions WHERE product_id=$1 LIMIT $2 OFFSET $3';

// (SELECT array_agg(row_to_json(answers_photos)) from answers_photos WHERE answers_photos.answer_id = answers.id) photos

const listQuestions = (product_id, page, count) => {
  count < 1 ? count = 1 : count;
  page < 1 ? page = 1 : page;
  const start = count * (page - 1);

  const quest = `SELECT *,
                    (SELECT JSON_object_agg(answers.id, row_to_json(answers))

                    from answers WHERE questions.id = answers.question_id) answers

                FROM questions WHERE product_id=$1 LIMIT $2 OFFSET $3`;

  const args = [product_id, count, start]

  return pool.query(quest, args);
};

module.exports = {
  listQuestions,
  // answersList,
};
