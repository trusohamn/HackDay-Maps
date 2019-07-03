import React, { useContext } from 'react';

import Location from './Location';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { MyContext } from '../contexts/MyContextProvider';


function App() {
  const context = useContext(MyContext);

  const switchText = (context.mode === 'explore') ? 'Edit map' : 'Explore';

  return (
    
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <h1 className="text-light">
            Your Map Space
          </h1>
          <button id="switch modes" onClick={context.switchMode}>{switchText}</button>
        </nav>
        {context.redirect}
        <Route path="/" component={Location} />
      </div>
  );
}

export default App;
