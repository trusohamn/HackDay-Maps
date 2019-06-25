

import { fromLonLat, toLonLat } from 'ol/proj';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import { Icon, Style } from 'ol/style.js';
import logo from './logo.svg'


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
let v;

function createStyle(src, img) {
    return new Style({
        image: new Icon(/** @type {module:ol/style/Icon~Options} */({
            anchor: [0.5, 0.96],
            crossOrigin: 'anonymous',
            src: src,
            img: img,
            imgSize: img ? [img.width, img.height] : undefined
        }))
    });
}



map.on('click', function (event) {
    if (v) map.removeLayer(v);
    const coord = toLonLat(event.coordinate);
    console.log(coord);
    document.getElementById('lon').value = (coord[0]);
    document.getElementById('lat').value = (coord[1]);

    const source = new VectorSource();
    const features = [];


    const coords = event.coordinate;
    const newFeature = new Feature({
        geometry: new Point(coords)
    })

   
    newFeature.set('style', createStyle(logo, undefined));
    features.push();

    source.addFeatures(features);
    v = new VectorLayer({
        source: source
    })

    map.addLayer(v);

});


 // // create WKT writer
        // var wktWriter = new ol.format.WKT();

        // // derive map coordinate (references map from Wrapper Component state)
        // var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

        // // create Point geometry from clicked coordinate
        // var clickedPointGeom = new ol.geom.Point(clickedCoordinate);

        // // write Point geometry to WKT with wktWriter
        // var clickedPointWkt = wktWriter.writeGeometry(clickedPointGeom);

        // // place Flux Action call to notify Store map coordinate was clicked
        // // Actions.setRoutingCoord(clickedPointWkt);