import React from 'react';
import MyContextProvider from './contexts/MyContextProvider';
import App from './components/App';
import { Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';


function Main() {
    return (
        <MyContextProvider>
            <Router basename={process.env.PUBLIC_URL}>
            <nav className="navbar navbar-dark bg-dark">
                <h1 className="text-light">
                    Your Map Space
          </h1>
          {/* <Link to="/location"><h3 className="text-light">
                    Go to map
          </h3></Link> */}
            </nav>
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
