import React, { useState } from 'react';

import Location from './components/Location';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
const MyContext = React.createContext(false);



function App() {
  // const [pointDescription, setPointDescription] = useState({});
  const [mode, setMode] = useState('explore');
  const [switchText, setSwitchText] = useState('Edit map');
  // const [data, setData] = useState(null);

  const switchMode = () => {
    const newMode = (mode === 'explore') ? 'edit' : 'explore';
    const switchText = (newMode === 'explore') ? 'Edit map' : 'Explore';
    setMode(newMode);
    setSwitchText(switchText);
  };

  return (
    <MyContext.Provider value={{pointId: '1235t5'}}>
      <Router>
        <div className="App">
          <nav className="navbar navbar-dark bg-dark">
            <h1 className="text-light">
              Your Map Space
          </h1>
            <button id="switch modes" onClick={switchMode}>{switchText}</button>
          </nav>
          <Route path="/location/:id" component={Location} />

          {/* <Map pointDescription={pointDescription} setPointDescription={setPointDescription} mode={mode} data={data} setData={setData}></Map>
        
        <Description pointDescription={pointDescription} setPointDescription={setPointDescription} mode={mode} data={data} setData={setData}></Description> */}
        </div>
      </Router>
    </MyContext.Provider>

  );
}

export default App;
