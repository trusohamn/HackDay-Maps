import React, { useContext } from 'react';
import Map from './Map';
import Description from './Description';
import { MyContext } from '../contexts/MyContextProvider';

function Location(props) {
    const context = useContext(MyContext);

    return (
        <div>
            pointId: {context.pointId} <br></br>
            {props.location.pathname}
            <Map></Map>
            <Description></Description>
        </div>
    );
}

export default Location;