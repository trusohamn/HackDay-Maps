import React, { useState, useEffect } from 'react';

function Description(props) {
    const [reviews, setReviews] = useState('');
    useEffect(() => {
        setReviews('');
    }, [props.pointDescription.id]);

    const fetchMorePointData = () => {
        console.log('click');
        //get request to api/points/:id
        fetch("http://localhost:8000/api/points/" + props.pointDescription.id)
            .then(res => res.json())
            .then(res => {
                console.log(res.rev)
                const rev = res.rev.map(e => {
                    return (
                        <div className="flexcontainercolumn">
                            <br></br>
                            <h3>{e.review}</h3>
                            <p> {e.description} </p>
                            <h5>{e.rating}</h5>
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

        fetch("http://localhost:8000/api/points/" + props.pointDescription.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataForm
        })
            .then(() => {
                props.setData(null);
            });
    }

    return (
        (!props.pointDescription.id || props.mode === 'edit') ?
            '' :
            <div className="flexcontainercolumn">
                <h1>
                    {props.pointDescription.name}
                </h1>
                <p>
                    {props.pointDescription.description}
                    <br />
                    rating: {props.pointDescription.rating}
                </p>
                <button type="click" onClick={fetchMorePointData} className="btn btn-dark btn-sm">Show reviews</button>

                {reviews}
                <form className="flexcontainer" onSubmit={submitReview}>
                    <div className="flexcontainercolumn">
                        <label for="title">Title:</label>
                        <input className="form-control input-sm" required name="title" id="title"></input>
                    </div>
                    <div className="flexcontainercolumn">
                        <label for="description">Description:</label>
                        <input className="form-control input-sm" placeholder="review" name="description" id="description"></input>
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