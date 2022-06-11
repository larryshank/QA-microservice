const express = require('express');
const router = express.Router();
const {listQuestions, answersList, addQuestion, addAnswer, markHelpfulQ, reportQ} = require('../../model/dbQueries/dbqueries.js')

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
  const question_id = req.params.question_id;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  answersList(question_id, page, count)
    .then(answers => res.send(answers))
    .catch(error => console.log(error));
});

router.post('/', (req, res) => {
  console.log(req.body);
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const product_id = req.body.product_id;
  addQuestion(body, name, email, product_id)
    .then(response=>res.sendStatus(201))
    .catch(error => console.log(error));
});

router.post('/:question_id/answers', (req, res) => {
  const question_id = req.params.question_id;
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos; //array
  addAnswer(question_id, body, name, email, photos)
    .then(response => res.sendStatus(201))
    .catch(error => console.log(error));
});

router.put('/:question_id/helpful', (req, res) => {
  const question_id = req.params.question_id;
  markHelpfulQ(question_id)
    .then(response => res.sendStatus(204))
    .catch(error => console.log(error));
});



router.put('/:question_id/report', (req, res) => {
  const question_id = req.params.question_id;
  reportQ(question_id)
    .then(response => res.sendStatus(204))
    .catch(error => console.log(error));
});

module.exports = router;