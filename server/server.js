/*
  This is the server where the web application is running.
  - Look in package.json whiich npm operations runs this script - e.g. npm start
*/
const express = require("express");
const path = require("path");
const PORT = 8080;
const app = express();

app.use('/', express.static(path.join(__dirname, '/../dist')));

// for any URL that is directly triggert (press ENTER, hyperlink),
// the index.html is send back from the server
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

app.listen(PORT);
console.log(`Server started at http://localhost:${PORT}`);
