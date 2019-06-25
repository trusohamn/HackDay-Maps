import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { fromLonLat, toLonLat } from 'ol/proj';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],

    view: new View({
        center: fromLonLat([17.762083241832443, 59.401848231069636]),
        zoom: 10
    })
});

fetch('http://localhost:8000/api/points')
    .then(res => res.json())
    .then(data => {
        const source = new VectorSource();
        const features = [];

        data.points.forEach((e) => {
            const coords = fromLonLat(e.localisation);
            console.log(e.localisation);
            console.log(coords);
            features.push(new Feature({
                geometry: new Point(coords)
            }));
        })

        source.addFeatures(features);

        const v = new VectorLayer({
            source: source
        })
        map.addLayer(v);

    })
    .catch(error => console.log(error));

map.on('click', function (event) {
    const coord = toLonLat(event.coordinate);
    console.log(coord);
    document.getElementById('lon').value = (coord[0]);
    document.getElementById('lat').value = (coord[1]);

    const source = new VectorSource();
    const features = [];


    const coords = event.coordinate;
    features.push(new Feature({
        geometry: new Point(coords)
    }));

    source.addFeatures(features);
    const v = new VectorLayer({
        source: source
    })
    map.addLayer(v);

});

serviceWorker.unregister();

