import React, { useContext } from "react";
import { MyContext } from "../contexts/MyContextProvider";
import PostForm from "./PostForm";

function Form(props) {
  const context = useContext(MyContext);

  const onSucessPost = () => context.setData(null);
  const apiPath = "/api/points";
  const formTitle = "Click on the map and add a new spot";

  const additionalInputs = {
    lon: context.lon,
    lat: context.lat
  };

  const inputs = [
    {
      name: "name",
      label: "Name:",
      required: true,
      placeholder: "place name",
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
      name: "image",
      label: "Image:",
      required: false,
      type: "file"
    },
    {
      name: "type",
      label: "Select type:",
      selectType: true,
      options: ["camping", "bonfire", "view", "hut"],
      default: "camping"
    }
  ];
  const buttonTitle = "Add to the map";

  return context.mode === "explore" ? null : (
    <PostForm
      contentType="multipart/form-data"
      onSucessPost={onSucessPost}
      apiPath={apiPath}
      formTitle={formTitle}
      additionalInputs={additionalInputs}
      inputs={inputs}
      buttonTitle={buttonTitle}
    />
  );
}
export default Form;
