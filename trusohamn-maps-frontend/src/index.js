import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import AuthContextProvider from './contexts/AuthContextProvider';

ReactDOM.render(
  <AuthContextProvider>
    <Main />
  </AuthContextProvider>, document.getElementById('root'));


