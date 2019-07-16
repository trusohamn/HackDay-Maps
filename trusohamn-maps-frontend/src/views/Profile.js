import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';


function Profile(props) {
  const authContext = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  if (!authContext.isAuthenticated) {
    props.history.push('/')
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/profiles', { // change in production !!!!
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + authContext.jwToken
      }
    })
      .then(res => res.json())
      .then(data => {
        setProfileData(data)
      }
      );
  }, [])

  return (

    <div className="Profile">
      Your Profile page <br></br>
      {profileData ?
        'sucess' :
        'no data'}


    </div>
  );
}

export default Profile;
