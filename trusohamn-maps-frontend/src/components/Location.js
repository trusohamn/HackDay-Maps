import React, { useState } from 'react';
import Map from './Map';
import Description from './Description';

function Location(props) {
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

    let pointId = this.context.pointId;

    return (
        <div>
            {pointId}
            {props.location.pathname}
            <Map pointDescription={pointDescription} setPointDescription={setPointDescription} mode={mode} data={data} setData={setData}></Map>

            <Description pointDescription={pointDescription} setPointDescription={setPointDescription} mode={mode} data={data} setData={setData}></Description> */}

        </div>
    )
}

export default Location;