import React, {useContext} from 'react';
import { SmallProfileImage } from '../styled-components/ProfileImage';
import { AuthContext } from '../contexts/AuthContextProvider';


function ReviewCard(props) {
  const authContext = useContext(AuthContext);

  return (
    <div className="ReviewCard flexcontainercolumn">
      <br></br>
      <h5>{props.e.title}</h5>
      <p> {props.e.description} </p>
      <h5>rated: {props.e.rating}</h5>
      {authContext.isAuthenticated ?
        <SmallProfileImage src={props.e.profilePicture} alt="Profile" /> : ''
      }
    </div>

  )
}

export default ReviewCard;