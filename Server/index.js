const express = require('express');
const app = express();
require('dotenv').config();

// middleware
app.use(express.json());

// routes
app.get('/qa/questions', (req, res) => {
  res.send('it worked');
})



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});