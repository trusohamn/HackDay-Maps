import React, { useState, useContext, useEffect } from 'react';
import { config } from '../url_config'
import { MyContext } from '../contexts/MyContextProvider';
const url = config.url.API_URL

function Description(props) {
    const context = useContext(MyContext);

    const [reviews, setReviews] = useState('');
    const [pointData, setPointData] = useState(null);

    useEffect(() => {
        setReviews('');
        if (context.data) {
            // console.log('Description use effetct, generating pointData, pointId', context.pointId);
            // console.log('pathname', window.location.pathname);
            const pointData = context.data.find(e =>
                e._id === context.pointId);
            setPointData(pointData);
        }
    }, [context.data, context.pointId]);

    const fetchReviews = () => {
        console.log('Description fetch reviews');
        //get request to api/points/:id
        fetch(url + "/api/points/" + context.pointId)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                const rev = res.map(e => {
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

        fetch(url + "/api/points/" + context.pointId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataForm
        })
            .then(res => res.json())
            .then((res) => {
                setPointData({ ...pointData, rating: res.newRating })
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

                <form className="container" onSubmit={submitReview}>
                    <div className="row">
                        <div className="col-sm">
                            <label htmlFor="title">Title:</label>
                            <input className="form-control input-sm" placeholder="title" required name="title" id="title"></input>
                        </div>
                        <div className="col-sm">
                            <label htmlFor="description">Description:</label>
                            <input className="form-control input-sm" placeholder="description" name="description" id="description"></input>
                        </div>
                        <div className="col-sm">
                            <label htmlFor="rating">Rating:</label>
                            <input className="form-control input-sm" placeholder="1-10" required min="1" max="10" name="rating" id="rating" type="number"></input>
                        </div>
                    </div>
                    <div className="flexcontainer">
                        <button type="submit" className=" btn btn-dark btn-bg">Review</button>
                    </div>
                </form>

            </div>

    )
}

export default Description;