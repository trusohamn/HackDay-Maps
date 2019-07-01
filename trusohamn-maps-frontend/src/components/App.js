import React, { useContext, useEffect, useState } from 'react';

import Location from './Location';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { MyContext } from '../contexts/MyContextProvider';


function App() {
  const context = useContext(MyContext);
  const switchText = (context.mode === 'explore') ? 'Edit map' : 'Explore';
  const [redirect, setRedirect] = useState(null)
  useEffect(() => {
    console.log('fromm app, point id change to', context.pointId)
    const newPath = "/" + context.pointId
    setRedirect(<Redirect to={newPath}></Redirect>)
  }, [context.pointId])
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <h1 className="text-light">
            Your Map Space
          </h1>
          <button id="switch modes" onClick={context.switchMode}>{switchText}</button>
        </nav>
        {redirect}
        <Route exact path="/" component={Location} />
        <Route path="/:id" component={Location} />
      </div>
    </Router>
  );
}

export default App;
