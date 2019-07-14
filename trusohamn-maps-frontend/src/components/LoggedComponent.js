import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';

function LoggedComponent(props) {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.isAuthenticated) props.history.push('/');
  }, [])

  return (<div>
    {authContext.isAuthenticated ? props.children : null}
  </div>
  );

}

export default LoggedComponent;