const express = require('express');
const qaRouter = require('./qa/qa.js');
const ansRouter = require('./ans/ans.js');


//will go to QA
const router = express.Router();
router.use('/qa/questions', qaRouter);
router.use('/qa/answers', ansRouter)
module.exports = router;