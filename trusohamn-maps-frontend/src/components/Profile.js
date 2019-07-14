import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../contexts/MyContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';


function Profile(props) {
  const context = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    console.log('Profile initial useeffect');
    fetch('http://localhost:8000/api/profiles', { // change in production !!!!
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + context.jwToken
      }
    })
      .then(res => res.json())
      .then(data => setProfileData(data));
  }, [])

  return (

    <div className="Profile">
      Your Profile page <br></br>
      {profileData ? profileData.message : 'no data'}


    </div>
  );
}

export default Profile;
