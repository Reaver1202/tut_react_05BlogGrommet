/*
  - this is the JavaScript entry point
  - loaded by index.html in /public/index.html

  - everthing same as in Grommet sample app
*/
import 'whatwg-fetch';
import { polyfill as promisePolyfill } from 'es6-promise';
promisePolyfill();

import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// take content-Element from index.html
let element = document.getElementById('content');
// render the App component into that element
ReactDOM.render((
  <App />
), element);

document.body.classList.remove('loading');
