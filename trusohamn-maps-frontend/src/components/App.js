import React, { useContext } from 'react';

import Location from './Location';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { MyContext } from '../contexts/MyContextProvider';


function App() {
  // const [pointDescription, setPointDescription] = useState({});
  // const [data, setData] = useState(null);
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
          <Route path="/location/:id" component={Location} />

          {/* <Map pointDescription={pointDescription} setPointDescription={setPointDescription} mode={mode} data={data} setData={setData}></Map>
        
        <Description pointDescription={pointDescription} setPointDescription={setPointDescription} mode={mode} data={data} setData={setData}></Description> */}
        </div>
      </Router>

  );
}

export default App;
