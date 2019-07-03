import React, { useContext, useEffect } from 'react';
import Map from './Map';
import Description from './Description';
import { MyContext } from '../contexts/MyContextProvider';

function Location(props) {
    const context = useContext(MyContext);

    useEffect(() => {
        // console.log('Location useEffect pathname was changed to', props.location.pathname);
        const pathPointId = props.location.pathname.split('/')[1] || null;  //change to regex
        if(context.saveInHistory){
            console.log('saving in the history');
            props.history.push(props.location.pathname);
            context.setSaveInHistory(false);
        };
        if (context.pointId !== pathPointId) {
            // console.log('Location, set Point Id', pathPointId);
            context.setPointId(pathPointId);
        }
    }, [props.location.pathname])
    

    return (
        <div>
            <Map></Map>
            <Description></Description>
        </div>
    );
}

export default Location;