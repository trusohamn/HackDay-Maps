import React, { useState } from 'react';
import Map from './components/Map';
import Description from './components/Description';
function App() {
  const [pointDescription, setPointDescription] = useState({});
  const [mode, setMode] = useState('explore');
  const [switchText, setSwitchText] = useState('Edit map');
  const [data, setData] = useState(null);

  const switchMode = () => {
    const newMode = (mode === 'explore') ? 'edit' : 'explore';
    const switchText = (newMode === 'explore') ? 'Edit map' : 'Explore';
    setMode(newMode);
    setSwitchText(switchText);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <h1 className="text-light">
          Your Map Space
    </h1>
        <button id="switch modes" onClick={switchMode}>{switchText}</button>
      </nav>

      <Map pointDescription={pointDescription} setPointDescription={setPointDescription} mode={mode} data={data} setData={setData}></Map>
      <Description pointDescription={pointDescription} setPointDescription={setPointDescription} mode={mode} data={data} setData={setData}></Description>
    </div>
  );
}

export default App;
