import React from 'react';
import ReactDOM from 'react-dom'; // 🔁 change this line
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';

ReactDOM.render( // 🔁 change this block
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);