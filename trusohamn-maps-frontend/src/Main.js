import React from 'react';
import MyContextProvider from './contexts/MyContextProvider';
import App from './components/App';


function Main() {

    return (
        <MyContextProvider>
            <App></App>
        </MyContextProvider>

    );
}

export default Main;
