import React, { useContext } from "react";

import Location from "./Location";
import { Route } from "react-router-dom";
import { MyContext } from "../contexts/MyContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

function App() {
  const context = useContext(MyContext);
  const authContext = useContext(AuthContext);

  const switchText = context.mode === "explore" ? "Edit map" : "Explore";

  const handleInputChange = event => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    switch (name) {
      case "cyclingOn":
        return context.setCyclingOn(value);
      case "hikingOn":
        return context.setHikingOn(value);
      case "hikebikeOn":
        return context.setHikebikeOn(value);
      case "hillshadingOn":
        return context.setHillshadingOn(value);
      default:
        return;
    }
  };

  return (
    <div className="App">
      {authContext.isAuthenticated ? (
        <button id="switch modes" onClick={context.switchMode}>
          {switchText}
        </button>
      ) : null}

      <form id="layers">
        <label>
          {/* <a href="https://cycling.waymarkedtrails.org/"> */}
          waymarkedtrails cycling {/* </a> */}
          <input
            name="cyclingOn"
            type="checkbox"
            checked={context.cyclingOn}
            onChange={handleInputChange}
          />
        </label>
        <label>
          {/* <a href="https://hiking.waymarkedtrails.org/"> */}
          waymarkedtrails hiking {/* </a> */}
          <input
            name="hikingOn"
            type="checkbox"
            value={context.hikingOn}
            onChange={handleInputChange}
          />
        </label>
        <label>
          {/* <a href="http://hikebikemap.org"> */}
          wmflabs Hike Bike {/* </a> */}
          <input
            name="hikebikeOn"
            type="checkbox"
            value={context.hikebikeOn}
            onChange={handleInputChange}
          />
        </label>
        <label>
          {/* <a href="http://hikebikemap.org"> */}
          wmflabs Hillshading {/* </a> */}
          <input
            name="hillshadingOn"
            type="checkbox"
            value={context.hillshadingOn}
            onChange={handleInputChange}
          />
        </label>
      </form>
      {context.redirect}
      <Route path="/" component={Location} />
    </div>
  );
}

export default App;
