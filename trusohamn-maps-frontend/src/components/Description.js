import React, { useState, useContext, useEffect } from 'react';
import { config } from '../url_config'
import { MyContext } from '../contexts/MyContextProvider';
const url = config.url.API_URL



function Description(props) {
    const context = useContext(MyContext);

    const [reviews, setReviews] = useState('');
    const [pointData, setPointData] = useState({});
    useEffect(() => {
        setReviews('');
        if (context.data) {
            const pointData = context.data.points.find(e =>
                e.id === context.pointId);
            setPointData(pointData);
        }
    }, [context.pointId]);





    const fetchReviews = () => {
        console.log('fetch reviews');
        //get request to api/points/:id
        fetch(url + "/api/points/" + context.pointId)
            .then(res => res.json())
            .then(res => {
                console.log(res.rev)
                const rev = res.rev.map(e => {
                    return (
                        <div className="flexcontainercolumn">
                            <br></br>
                            <h5>{e.title}</h5>
                            <p> {e.description} </p>
                            <h5>rated: {e.rating}</h5>
                        </div>
                    )
                })
                setReviews(rev);
            });
    }

    const submitReview = (e) => {
        e.preventDefault();
        const dataForm = new URLSearchParams();
        for (const pair of new FormData(e.target)) {
            dataForm.append(pair[0], pair[1]);
        }

        fetch(url + "/api/points/" + props.pointDescription.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataForm
        })
            .then(() => {
                props.setData(null);
                props.setPointDescription({});
            });
    }

    return (
        (!pointData || context.mode === 'edit') ?
            '' :
            <div className="flexcontainercolumn">
                <h1>
                    {pointData.name}
                </h1>
                <p>
                    {pointData.description}
                    <br />
                    rating: {pointData.rating}
                </p>
                <button type="click" onClick={fetchReviews} className="btn btn-dark btn-sm">Show reviews</button>

                {reviews}
                <form className="flexcontainer" onSubmit={submitReview}>
                    <div className="flexcontainercolumn">
                        <label for="title">Title:</label>
                        <input className="form-control input-sm" placeholder="title" required name="title" id="title"></input>
                    </div>
                    <div className="flexcontainercolumn">
                        <label for="description">Description:</label>
                        <input className="form-control input-sm" placeholder="description" name="description" id="description"></input>
                    </div>
                    <div className="flexcontainercolumn">
                        <label for="rating">Rating:</label>
                        <input className="form-control input-sm" required min="1" max="10" name="rating" id="rating" type="number"></input>
                    </div>
                    <button type="submit" className="btn btn-dark btn-bg">Review</button>
                </form>

            </div>

    )
}

export default Description;