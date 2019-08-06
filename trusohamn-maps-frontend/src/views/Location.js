import React, { useContext, useEffect } from 'react';
import Map from '../components/Map';
import Description from '../components/Description';
import { MyContext } from '../contexts/MyContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';

import { config } from '../url_config'


function Location(props) {
  const context = useContext(MyContext);
  const authContext = useContext(AuthContext);

  
  useEffect(() => {
    const pathPointId = props.location.pathname.match(/[^/]+$/) ?
      props.location.pathname.match(/[^/]+$/)[0] : null;
    if (context.pointId !== pathPointId) {
      context.setPointId(pathPointId);
    }
  }, [props.location.pathname])

  const addToFavourites = () => {
    const data = new URLSearchParams();
    data.append('locationId', context.pointId);
    fetch(config.url.API_URL + '/api/profiles/favourites', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + authContext.jwToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      })
        .then((res) => {
          console.log(res);
        })
  }

  return (
    <div>
      <button onClick={addToFavourites}>add to favourites</button>
      <Map history={props.history}></Map>
      <Description></Description>
    </div>
  );
}

export default Location;