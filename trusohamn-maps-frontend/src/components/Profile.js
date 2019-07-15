import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../contexts/MyContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';


function Profile(props) {
  const authContext = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  if (!authContext.isAuthenticated) {
    console.log('now should redirect to root');
    props.history.push('/')
  };

  useEffect(() => {
    console.log('Profile initial useeffect');
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
        
        console.log(data);
        setProfileData(data)}
        );
  }, [])

  return (

    <div className="Profile">
      Your Profile page <br></br>
      {profileData ? 
        'sucess': 
        'no data'}


    </div>
  );
}

export default Profile;
