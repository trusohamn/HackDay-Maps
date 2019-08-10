import React, { useState, useContext, useEffect } from "react";
import { config } from "../url_config";
import { MyContext } from "../contexts/MyContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { SmallProfileImage } from "../styled-components/ProfileImage";
import ReviewCard from "./ReviewCard";
import PostForm from "./PostForm";

const url = config.url.API_URL;

function Description(props) {
  const context = useContext(MyContext);
  const authContext = useContext(AuthContext);

  const [reviews, setReviews] = useState("");
  const [pointData, setPointData] = useState(null);

  useEffect(() => {
    setReviews("");
    if (context.data) {
      const pointData = context.data.find(e => e._id === context.pointId);
      setPointData(pointData);
    }
  }, [context.data, context.pointId]);

  const fetchReviews = () => {
    fetch(url + "/api/points/" + context.pointId)
      .then(res => res.json())
      .then(res => {
        const rev = res.map((e, index) => {
          return <ReviewCard e={e} key={index} />;
        });
        setReviews(rev);
      });
  };

  const onSucessPost = async data => {
    const res = await data.json();
    setPointData({ ...pointData, rating: res.newRating });
    fetchReviews();
  };
  const apiPath = "/api/points/" + context.pointId;
  const formTitle = "Add a review";

  const inputs = [
    {
      name: "title",
      label: "Title:",
      required: true,
      placeholder: "Title",
      type: "text"
    },
    {
      name: "description",
      label: "Description:",
      required: false,
      placeholder: "place decription",
      type: "text"
    },
    {
      name: "rating",
      label: "Rating:",
      required: true,
      min: "1",
      max: "10",
      type: "number",
      placeholder: "1-10"
    },
    {
      name: "image",
      label: "Image:",
      required: false,
      type: "file"
    }
  ];
  const buttonTitle = "Send";

  return !pointData || context.mode === "edit" ? (
    ""
  ) : (
    <div className="flexcontainercolumn">
      <h1>{pointData.name}</h1>
      <p>{pointData.description}</p>
      {pointData.images &&
        pointData.images.map(image => <img src={image} alt="img" />)}
      <h5>rating: {pointData.rating}</h5>
      {authContext.isAuthenticated && (
        <p>
          created by:{" "}
          <SmallProfileImage src={pointData.profilePicture} alt="Profile" />
        </p>
      )}

      <button
        type="click"
        onClick={fetchReviews}
        className="btn btn-dark btn-sm"
      >
        Show reviews
      </button>

      {reviews}

      {authContext.isAuthenticated ? (
        <PostForm
          onSucessPost={onSucessPost}
          apiPath={apiPath}
          formTitle={formTitle}
          inputs={inputs}
          buttonTitle={buttonTitle}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Description;
