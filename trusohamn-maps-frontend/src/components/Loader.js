import { BallSpinner } from "react-spinners-kit";
import React from 'react';


function Loader(props){
    return (
        <BallSpinner
        size={props.size}
        color="#686769"
        loading={props.loading}
    />
    );
}

export default Loader;