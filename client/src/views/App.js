import React, { useContext } from 'react';

import Location from './Location';
import { Route } from 'react-router-dom';
import { MyContext } from '../contexts/MyContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';



function App() {
  const context = useContext(MyContext);
  const authContext = useContext(AuthContext);

  const switchText = (context.mode === 'explore') ? 'Edit map' : 'Explore';

  return (

    <div className="App">
      { authContext.isAuthenticated ? 
      <button id="switch modes" onClick={context.switchMode}>{switchText}</button> :
      null
    }
      {context.redirect}
      <Route path="/" component={Location} />
    </div>
  );
}

export default App;
