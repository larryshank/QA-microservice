const express = require('express');
const qaRouter = require('./qa/qa.js');

//will go to QA
const router = express.Router();
router.use('/qa/questions', qaRouter);

module.exports = router;