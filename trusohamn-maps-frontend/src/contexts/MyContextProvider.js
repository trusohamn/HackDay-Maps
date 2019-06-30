import React, { useState } from 'react'
export const MyContext = React.createContext()

function MyContextProvider(props) {
    const [pointId, setPointId] = useState('new Point id')

    const state = {
        pointId,
        setPointId
    }

    return (
        <MyContext.Provider value={state}>
            {props.children}
        </MyContext.Provider>
    )

}
export default MyContextProvider
