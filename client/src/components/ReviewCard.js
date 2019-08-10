import React, { useContext } from "react";
import { SmallProfileImage } from "../styled-components/ProfileImage";
import { AuthContext } from "../contexts/AuthContextProvider";

function ReviewCard(props) {
  const authContext = useContext(AuthContext);

  return (
    <div className="ReviewCard flexcontainercolumn">
      <br />
      <h5>{props.e.title}</h5>
      <p> {props.e.description} </p>
      <h5>rated: {props.e.rating}</h5>
      {props.e.images &&
        props.e.images.map(image => <img src={image} alt="img" />)}
      {authContext.isAuthenticated && (
        <SmallProfileImage src={props.e.profilePicture} alt="Profile" />
      )}
    </div>
  );
}

export default ReviewCard;
