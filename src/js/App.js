import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// browserHistory = tells ReactRouter how to interprete changes of the URL
// browserHistory: http://www.blog.com/posts/5 --> browserHistory considers everything after domain --> "/posts/5"
// hashHistory: http://www.blog.com/#posts/5 --> considers everything behind the "#"
// memoryHistory: doesn´t really use the URL at all for reading
import { Router, browserHistory } from 'react-router';

// available routes:
import routes from './routes';
// available react-redux state using reducers
import store from './store';

export default () => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
      onUpdate={() => document.getElementById('content').focus()}/>
  </Provider>
);
