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

const addQuestion = (body, name, email, product_id) => {
  const addQuest = `INSERT INTO questions (product_id, body, asker_name, asker_email, date_written) VALUES
  ($1, $2, $3, $4, now())`;

  const args = [product_id, body, name, email];

  return pool.query(addQuest, args);
};


const addAnswer = (question_id, body, name, email, photos) => {
 return (async () => {
    const client = await pool.connect()
    try {
      console.log('here???');
      await client.query('BEGIN')
      const args = [question_id, body, name, email];
    const queryText = 'INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email) VALUES($1, $2, now(), $3, $4) RETURNING id';
    const res = await client.query(queryText, args);
    console.log(res);
    for (let i = 0; i < photos.length; i++) {
      const photoArgs = [res.rows[0].id, photos[i]]
      const insertPhotos = 'INSERT INTO answers_photos(answer_id, url) VALUES ($1, $2)'
      await client.query(insertPhotos, photoArgs);
    }
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
  })().catch(e => console.error(e.stack))
}

const markHelpfulQ = (question_id) => {
  const helpfulQ = `UPDATE questions SET helpful = helpful + 1 WHERE id = $1`;
  const args = [question_id];
  return pool.query(helpfulQ, args);
}

const markHelpfulA = (answer_id) => {
  const helpfulA = `UPDATE answers SET helpful = helpful +1 WHERE id = $1`;
  const args = [answer_id];
  return pool.query(helpfulA, args);
}

const reportQ = (question_id) => {
  const reportQ = `UPDATE questions SET reported = reported + 1 WHERE id = $1`;
  const args = [question_id];
  return pool.query(reportQ, args);
}

const reportA = (answer_id) => {
  const reportA = `UPDATE answers SET reported = 1 WHERE id = $1`;
  const args = [answer_id];
  return pool.query(reportA, args);
}

module.exports = {
  listQuestions,
  answersList,
  addQuestion,
  addAnswer,
  markHelpfulQ,
  markHelpfulA,
  reportQ,
  reportA,
};
