import React, { useContext } from 'react';

import Location from './Location';
import { Route } from 'react-router-dom';
import { MyContext } from '../contexts/MyContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';



function App() {
  const context = useContext(MyContext);
  const authContext = useContext(AuthContext);

  const switchText = (context.mode === 'explore') ? 'Edit map' : 'Explore';

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    switch(name){
      case 'cyclingOn' : return context.setCyclingOn(value);
      case 'hikingOn' : return context.setHikingOn(value);
      default : return
    }
  }

  return (

    <div className="App">
      { authContext.isAuthenticated ? 
      <button id="switch modes" onClick={context.switchMode}>{switchText}</button> :
      null
    }

    <form>
        <label>
          Hiking map:
          <input
            name="cyclingOn"
            type="checkbox"
            checked={context.cyclingOn}
            onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Cycling map:
          <input
            name="hikingOn"
            type="checkbox"
            value={context.hikingOn}
            onChange={handleInputChange} />
        </label>
      </form>
      {context.redirect}
      <Route path="/" component={Location} />
    </div>
  );
}

export default App;
