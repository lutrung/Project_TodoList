import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Redux/Reducer/rootReducer';
import reduxThunk from 'redux-thunk'

export const history = createBrowserHistory();

const store = createStore(rootReducer, applyMiddleware(reduxThunk));


ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>,
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
