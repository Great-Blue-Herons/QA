const app = require('./app.js');


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
