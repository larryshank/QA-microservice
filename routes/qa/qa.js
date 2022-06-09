const express = require('express');
const router = express.Router();
const {listQuestions} = require('../../model/dbQueries/dbqueries.js')

router.get('/', (req, res) => {
  console.log(req.query);
  const product_id = req.query.product_id;
  const page = req.query.page || 1;
  const count = req.query.count || 5
  listQuestions(product_id, page, count)
    .then(questions => res.send(questions))
    .catch(error => console.log(error));
});

module.exports = router;