import React, { useContext, useEffect } from 'react';
import Map from '../components/Map';
import Description from '../components/Description';
import { MyContext } from '../contexts/MyContextProvider';

function Location(props) {
  const context = useContext(MyContext);
  
  useEffect(() => {
    const pathPointId = props.location.pathname.match(/[^/]+$/) ?
      props.location.pathname.match(/[^/]+$/)[0] : null;
    if (context.pointId !== pathPointId) {
      context.setPointId(pathPointId);
    }
  }, [props.location.pathname])


  return (
    <div>
      <Map history={props.history}></Map>
      <Description></Description>
    </div>
  );
}

export default Location;