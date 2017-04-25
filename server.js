const express = require('express');

var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/data', (req, res) => {
  res.send({
    name: 'Michael Gee',
    age: 21,
    nickname: 'Mike'
  });
});

app.listen(3000, () => {
  console.log("Local serving on port 3000!");
});
