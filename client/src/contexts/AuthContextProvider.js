import React, { useState } from 'react'
import mockedLogin from '../mocked_login';
export const AuthContext = React.createContext({})

function AuthContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(process.env.REACT_APP_LOGEDIN ? 
    true: false);
  const [user, setUser] = useState(process.env.REACT_APP_LOGEDIN ? 
    mockedLogin.user :
    null);
  const [picture, setPicture] = useState(process.env.REACT_APP_LOGEDIN ? 
    mockedLogin.picture :
    null);
  const [jwToken, setJwToken] = useState(process.env.REACT_APP_LOGEDIN ? 
    mockedLogin.jwToken :
    null);

    const state = {
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      jwToken,
      setJwToken,
      picture,
      setPicture
    }
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )

}
export default AuthContextProvider
