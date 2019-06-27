import React, { useState } from 'react';

function Description(props) {
    const [pointData, setPointData] = useState({});
    const fetchMorePointData = () => {
        console.log('click');
        //get request to api/points/:id
        fetch("http://localhost:8000/api/points/"+props.pointDescription.id)
        .then(res => res.json())
        .then(res => console.log(res));
        
    }

    return (
        <div>
            <h1>
                {props.pointDescription.name}
            </h1>
            <p>
                {props.pointDescription.description},
                {props.pointDescription.id}
            </p>
            <button type="click" onClick={fetchMorePointData} className="btn btn-dark btn-sm">More info</button>
            {pointData.id}

        </div>
    )
}

export default Description;