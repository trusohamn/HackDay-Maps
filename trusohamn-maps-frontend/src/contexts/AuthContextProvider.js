import React, { useState } from 'react'
export const AuthContext = React.createContext({})

function AuthContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [jwToken, setJwToken] = useState(null);

    const state = {
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      jwToken,
      setJwToken
    }
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )

}
export default AuthContextProvider
