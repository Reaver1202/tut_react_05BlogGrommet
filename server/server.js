/*
  This is the server where the web application is running.
  - Look in package.json which npm operations runs this script - e.g. npm start or npm run dev-server
*/
import express from 'express';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';

// custom imports
import api from './api';

// >>> Express configuration
const app = express()
  .use(compression())
  .use(cookieParser())
  .use(morgan('tiny'))
  .use(bodyParser.json());

// >>> enable CORS on ExpressJS Server
//  to be able to answer to client from another domain
//  e.g. client localhost:3000 requests server on localhost:8080 
//  https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// >>> REST API
app.use('/api', api);

// >>>UI
app.use('/', express.static(path.join(__dirname, '/../dist')));
// for any URL that is directly triggert (press ENTER, hyperlink),
// the index.html is send back from the server
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

// >>> Server configuration
const PORT = 8080;
const server = http.createServer(app);
server.listen(PORT);

console.log(`Server started at http://localhost:${PORT}`);
