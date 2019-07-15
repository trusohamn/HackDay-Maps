import React, { useContext } from 'react';
import MyContextProvider from './contexts/MyContextProvider';
import App from './components/App';
import Profile from './components/Profile';
import { Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { AuthContext } from './contexts/AuthContextProvider';
import { ProfileImage } from './styled-components/ProfileImage';

function Main() {
  const authContext = useContext(AuthContext);

  const logout = () => {
    authContext.setIsAuthenticated(false);
    authContext.setUser(null);
    authContext.setJwToken(null);
  };

  const facebookResponse = (response) => {
    console.log(response);
    // store data in local storage

    const options = {
      method: 'POST',
      body: `access_token=${response.accessToken}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch('http://localhost:8000/api/auth/facebook', options) // change in production !!!!
      .then(r => {
        const token = r.headers.get('x-auth-token');
        console.log(token);
        r.json().then(user => {
          if (token) {
            console.log(user);
            authContext.setIsAuthenticated(true);
            authContext.setUser(user._id);
            authContext.setJwToken(token);
            authContext.setPicture(user.photoUrl);
          }
        });
      })
  }

  return (
    <MyContextProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <nav className="navbar navbar-dark bg-dark">
          <h1 className="text-light">
            Your Map Space
          </h1>
          {authContext.isAuthenticated ?
            <button onClick={logout} className="button">
              Log out
            </button>
            :
            <FacebookLogin
              appId="383464965621720"
              autoLoad={false}
              fields="name,email,picture"
              callback={facebookResponse} />
          }
          {authContext.isAuthenticated ?
            <Link to='/profile'>
              {authContext.picture ?
                <ProfileImage src={authContext.picture} alt="profile" /> :
                Profile}
            </Link>
            : ''}
        </nav>

        <Switch>
          <Route path="/location" component={App} />
          <Route exact path="/">
            <Redirect to="/location"></Redirect>
          </Route>
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </MyContextProvider>

  );
}

export default Main;
