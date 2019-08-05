import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import { Link } from 'react-router-dom';
import { config } from '../url_config'
import Loader from '../components/Loader'

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
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + authContext.jwToken
      } 
    })
      .then(res => res.json())
      .then(data => {
        console.log('============',data);
        setProfileData(data)
      }
      );
  }, [])

  return (

    <div className="Profile">
      {profileData ?
      <div className="flexcontainercolumn">
        <h2>{profileData.user.name}</h2>
        <h4>Your locations:
        </h4>
        {profileData.locations.map(location => {
          return   <Link to={"/location/"+location._id}>{location.name}</Link>
        })}
         </div>
        :
        <Loader size={80} loading={true}/>}


    </div>
  );
}

export default Profile;
