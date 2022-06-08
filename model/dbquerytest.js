require('dotenv').config();

const { Pool } = require('pg');

const pool = new  Pool();

pool.query('EXPLAIN ANALYZE SELECT * FROM questions WHERE ID < 20')
  .then(res => console.log(res))
  .catch(err => console.log(err));



