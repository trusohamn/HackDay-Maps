import React, { useState } from 'react';
import MyContextProvider from './contexts/MyContextProvider';
import App from './components/App';
import { Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';


function Main() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken('');
    };

    const facebookResponse = (response) => {
        console.log(response);
        // store data in local storage

        // const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)],
        //     { type: 'application/json' });

        const options = {
            method: 'POST',
            body: `access_token=${response.accessToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch('http://localhost:8000/api/v1/auth/facebook', options)
            .then(r => {
                const token = r.headers.get('x-auth-token');
                console.log(token);
                r.json().then(user => {
                        if (token) {
                            console.log(user);
                            // setIsAuthenticated(true);
                            // setUser(user);
                            // setToken(token);
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
                    {/* <div class="fb-login-button" data-width="" data-size="medium" data-button-type="continue_with" data-auto-logout-link="true" data-use-continue-as="false"></div> */}
                    {isAuthenticated ?
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
                </nav>
                token:{token} <br></br>
                user:{user} <br></br>

                <Switch>
                    <Route path="/location" component={App} />
                    <Route exact path="/">
                        <Redirect to="/location"></Redirect>
                    </Route>
                </Switch>
            </Router>
        </MyContextProvider>

    );
}

export default Main;
