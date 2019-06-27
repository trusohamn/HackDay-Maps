import React, { useState } from 'react';
import Map from './components/Map';
import Description from './components/Description';
function App() {
  const [pointDescription, setPointDescription] = useState({});
  const [mode, setMode] = useState('explore');
  const [switchText, setSwitchText] = useState('Edit map');

  const switchMode = () => {
    const newMode = (mode === 'explore') ? 'edit' : 'explore';
    const switchText = (newMode === 'explore') ? 'Edit map' : 'Explore';
    setMode(newMode);
    setSwitchText(switchText);
  };

  return (
    <div className="App">
      <button id="switch modes" onClick={switchMode}>{switchText}</button>
      <Map setPointDescription={setPointDescription} mode={mode}></Map>
      <Description pointDescription={pointDescription} mode={mode}></Description>
    </div>
  );
}

export default App;
