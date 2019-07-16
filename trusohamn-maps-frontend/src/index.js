import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import AuthContextProvider from './contexts/AuthContextProvider';
import MyContextProvider from './contexts/MyContextProvider';

ReactDOM.render(
  <MyContextProvider>
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  </MyContextProvider>
  , document.getElementById('root'));


