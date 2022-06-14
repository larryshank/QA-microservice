const express = require('express');
const router = require('./routes');

require('dotenv').config();

const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());
// app.use(express.static('dist'));

app.use('/qa', router);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
