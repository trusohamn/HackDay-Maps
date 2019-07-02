import React, { useState } from 'react'
export const MyContext = React.createContext({})

function MyContextProvider(props) {
    const [pointId, setPointId] = useState(null);
    const [redirect, setRedirect] = useState(null)
    const [mode, setMode] = useState('explore');
    const [data, setData] = useState(null);

    const switchMode = () => {
        const newMode = (mode === 'explore') ? 'edit' : 'explore';
        setMode(newMode);
    };

    const state = {
        pointId,
        setPointId,
        redirect,
        setRedirect,
        mode,
        switchMode,
        data,
        setData
    }
    return (
        <MyContext.Provider value={state}>
            {props.children}
        </MyContext.Provider>
    )

}
export default MyContextProvider
