import React, { useContext, useState } from "react";
import { config } from "../url_config";
import { AuthContext } from "../contexts/AuthContextProvider";

function PostForm(props) {
  const authContext = useContext(AuthContext);

  const resetForm = () => {
    return props.inputs.reduce((acc, input) => {
      acc[input.name] = input.default || "";
      return acc;
    }, {});
  };

  const [state, setState] = useState(resetForm());
  const [images, setImages] = useState(null);

  const handleChange = e => {
    setState({ ...state, [e.target.id]: e.target.value });
    console.log(e.target.files);
    e.target.files && setImages(Array.from(e.target.files));
  };

  const SubmitHandler = e => {
    e.preventDefault();

    const data = new FormData();
    for (const key in state) {
      console.log(key, state[key]);
      data.append(key, state[key]);
    }
    for (const key in props.additionalInputs) {
      console.log(key, props.additionalInputs[key]);
      data.append(key, props.additionalInputs[key]);
    }

    if (images) {
      images.forEach((image, i) => {
        console.log(i, image);
        data.append(`image_${i}`, image);
      });
    }

    fetch(config.url.API_URL + props.apiPath, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + authContext.jwToken
      },
      body: data
    }).then(res => {
      setState(resetForm());
      props.onSucessPost && props.onSucessPost(res);
    });
  };

  return (
    <div>
      <form
        className="container"
        onSubmit={SubmitHandler}
        enctype="multipart/form-data"
      >
        <div className="flexcontainer">
          <h3>{props.formTitle}</h3>
        </div>
        <div className="row">
          {props.inputs.map(input => {
            return (
              <div className="col-sm" key={input.name}>
                <label htmlFor={input.name}>{input.label}</label>
                {input.selectType ? (
                  <select
                    className="form-control input-sm"
                    id={input.name}
                    name={input.name}
                    value={state[input.name]}
                    onChange={handleChange}
                  >
                    {input.options.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    required={input.required}
                    className="form-control input-sm"
                    placeholder={input.placeholder}
                    type={input.type}
                    name={input.name}
                    id={input.name}
                    min={input.min}
                    max={input.max}
                    value={state[input.name]}
                    onChange={handleChange}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flexcontainer">
          <button type="submit" className="btn btn-dark btn-bg">
            {props.buttonTitle}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
