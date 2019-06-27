import React, {useState} from 'react';
import Map from './components/Map';
import Description from './components/Description';
function App() {
  const [pointDescription, setPointDescription] = useState({})

  return (
    <div className="App">
     <Map setPointDescription={setPointDescription}></Map>
     <Description pointDescription={pointDescription}></Description>
    </div>
  );
}

export default App;
