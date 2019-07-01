import React, { useContext } from 'react';

import Location from './Location';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { MyContext } from '../contexts/MyContextProvider';


function App() {
  const context = useContext(MyContext);
  const switchText = (context.mode === 'explore') ? 'Edit map' : 'Explore';
  return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-dark bg-dark">
            <h1 className="text-light">
              Your Map Space
          </h1>
            <button id="switch modes" onClick={context.switchMode}>{switchText}</button>
          </nav>
          <Route exact path="/" component={Location} />
          <Route path="/:id" component={Location} />
        </div>
      </Router>

  );
}

export default App;
