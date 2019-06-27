import React from 'react';

function Description(props) {

    return (
        <div>
            <h1>
                {props.pointDescription.name}
            </h1>
            <p>
                {props.pointDescription.description}
            </p>
        </div>
    )
}

export default Description;