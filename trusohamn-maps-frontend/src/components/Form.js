import React, {useContext} from 'react';
import { config } from '../url_config'
import { MyContext } from '../contexts/MyContextProvider';
const url = config.url.API_URL


function Form(props) {

    const context = useContext(MyContext);
    const postPoint = (e) => {
        e.preventDefault();

        const data = new URLSearchParams();
        for (const pair of new FormData(e.target)) {
            data.append(pair[0], pair[1]);
        }

        fetch(url + "/api/points", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then((res) => {
                console.log('new point posted');
                context.setData(null);
            })
    }

    return (
        context.mode === 'explore' ? '' :
            <div>
                <form className="container" onSubmit={postPoint} action="http://localhost:8000/api/points" method="post" >

                    <div className="row">
                        <h3 className="col-sm">Add new location  </h3>
                        <input className="d-none" readOnly type="number" step="any" name="lon" id="lon" value={props.lon}></input>
                        <input className="d-none" readOnly type="number" step="any" name="lat" id="lat" value={props.lat}></input>
                    </div>
                    <div className="row">

                        <div className="col-sm">
                            <label for="name">Name:</label>
                            <input required className="form-control input-sm" placeholder="place name" type="text" name="name" id="name"></input>
                        </div>
                        <div className="col-sm">
                            <label for="description">Description:</label>
                            <input className="form-control input-sm" placeholder="place decription" type="text" name="description" id="description"></input>
                        </div>
                        <div className="col-sm">
                            <label for="type">Select type:</label>
                            <select className="form-control input-sm" id="type" name="type">
                                <option>camping</option>
                                <option>bonfire</option>
                                <option>view</option>
                            </select>
                        </div>
                        <div className="col-sm">
                            <button type="submit" className="btn btn-dark btn-bg">Go</button>
                        </div>
                    </div>
                </form>
            </div >


    )
}
// className="d-none"
// action="http://localhost:8000/api/points" method="post"
export default Form;