import React from 'react';
import MyContextProvider from './contexts/MyContextProvider';
import App from './components/App';
import { Route, HashRouter as Router, Redirect } from 'react-router-dom';


function Main() {

    return (
        <MyContextProvider>
            <Router>
                <Route path="/">
                    <Redirect to="/location"></Redirect>
                </Route>
            <Route path="/location" component={App} />
            </Router>
        </MyContextProvider>

    );
}

export default Main;
