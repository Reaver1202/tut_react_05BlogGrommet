import 'whatwg-fetch';
import { polyfill as promisePolyfill } from 'es6-promise';
promisePolyfill();

import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

let element = document.getElementById('content');

ReactDOM.render((
  <App />
), element);

document.body.classList.remove('loading');
