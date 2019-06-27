import React from 'react';


function Form(props) {


    const postPoint = (e) => {
        e.preventDefault();

        // get data from the form

        //post the data to api/points

        //refresh the page
        props.removeData();
    }

    return (<form onSubmit={postPoint} >
        <input readOnly type="number" step="any" name="lon" id="lon" value={props.lon}></input>
        <input readOnly type="number" step="any" name="lat" id="lat" value={props.lat}></input>
        <input type="text" name="description" id="description"></input>
        <button type="submit" className="btn btn-dark btn-sm">Go</button>
    </form>)
}
// class="d-none"
// action="http://localhost:8000/api/points" method="post"
export default Form;