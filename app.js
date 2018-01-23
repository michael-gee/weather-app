const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

let app = express();

app.use(routes);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  const error = new Error('404: Page was Not Found!');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status);
  res.render('error', { err });
});

app.listen(3000, () => {
  console.log("Local serving on port 3000!");
});

