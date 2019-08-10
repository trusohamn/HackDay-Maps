import React, { useState } from "react";
export const MyContext = React.createContext({});

function MyContextProvider(props) {
  const [pointId, setPointId] = useState(null);
  const [mode, setMode] = useState("explore");
  const [data, setData] = useState(null);
  const [lon, setLon] = useState(17.86208324183244);
  const [lat, setLat] = useState(59.30184823106963);
  const [cyclingOn, setCyclingOn] = useState(false);
  const [hikingOn, setHikingOn] = useState(false);
  const [hikebikeOn, setHikebikeOn] = useState(false);
  const [hillshadingOn, setHillshadingOn] = useState(false);
  const [geoCords, setGeoCords] = useState(null);

  const switchMode = () => {
    const newMode = mode === "explore" ? "edit" : "explore";
    setMode(newMode);
  };

  const getPointIdData = (id = pointId) => {
    const pointData = data.find(d => d._id == id);
    return pointData;
  };

  const state = {
    pointId,
    setPointId,
    getPointIdData,
    mode,
    setMode,
    switchMode,
    data,
    setData,
    lon,
    setLon,
    lat,
    setLat,
    cyclingOn,
    setCyclingOn,
    hikingOn,
    setHikingOn,
    hikebikeOn,
    setHikebikeOn,
    hillshadingOn,
    setHillshadingOn,
    geoCords,
    setGeoCords
  };
  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
}
export default MyContextProvider;
