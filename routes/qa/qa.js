const express = require('express');
const router = express.Router();
const {listQuestions, answersList} = require('../../model/dbQueries/dbqueries.js')

router.get('/', (req, res) => {
  console.log(req.query);
  const product_id = req.query.product_id;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  listQuestions(product_id, page, count)
    .then(questions => res.send(questions))
    .catch(error => console.log(error));
});

router.get('/:question_id/answers', (req, res) => {
  console.log(req.params);
  const product_id = req.params.question_id;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  answersList(product_id, page, count)
    .then(answers => res.send(answers))
    .catch(error => console.log(error));
});

module.exports = router;