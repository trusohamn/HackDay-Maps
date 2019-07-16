import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import { config } from '../url_config'
const url = config.url.API_URL


function Profile(props) {
  const authContext = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  if (!authContext.isAuthenticated) {
    props.history.push('/')
  };

  useEffect(() => {
    fetch(url + '/api/profiles', { 
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
