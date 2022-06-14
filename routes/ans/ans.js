const express = require('express');
const router = express.Router();
const { markHelpfulA, reportA } = require('../../model/dbQueries/dbqueries.js');

router.put('/:answer_id/helpful', (req, res) => {
  const answer_id = req.params.answer_id;
  markHelpfulA(answer_id)
    .then(response => res.sendStatus(204))
    .catch(error => console.log(error));
});

router.put('/:answer_id/report', (req, res) => {
  const answer_id = req.params.answer_id;
  reportA(answer_id)
    .then(response => res.sendStatus(204))
    .catch(error => console.log(error));
});


module.exports = router;