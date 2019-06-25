//externals
import React from 'react';
import { fromLonLat, toLonLat } from 'ol/proj';

//open layers and styles
var ol = require('openlayers');
require('openlayers/css/ol.css');

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state=({
            lon: 18,
            lat: 60 
        });
    }

    componentDidMount() {

        // create feature layer and vector source
        var featuresLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: []
            })
        });

        // create map object with feature layer
        var map = new ol.Map({
            target: this.refs.mapContainer,
            layers: [
                //default OSM layer
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                featuresLayer
            ], view: new ol.View({
                center: fromLonLat([17.762083241832443, 59.401848231069636]),
                zoom: 13,
            })
        });

        map.on('click', this.handleMapClick.bind(this));

        // save map and layer references to local state
        this.setState({
            map: map,
            featuresLayer: featuresLayer,
            lon: 18,
            lat: 60 
        });

        fetch('http://localhost:8000/api/points')
            .then(res => res.json())
            .then(data => {
                const source = new ol.source.Vector();
                const features = [];

                data.points.forEach((e) => {
                    const coords = fromLonLat(e.localisation);
                    console.log(e.localisation);
                    console.log(coords);
                    features.push(new ol.Feature({
                        geometry: new ol.geom.Point(coords)
                    }));
                })

                source.addFeatures(features);

                const v = new ol.layer.Vector({
                    source: source
                })
                map.addLayer(v);

            })
            .catch(error => console.log(error));

    }

    // pass new features from props into the OpenLayers layer object
    componentDidUpdate(prevProps, prevState) {
        this.state.featuresLayer.setSource(
            new ol.source.Vector({
                features: this.props.routes
            })
        );
    }

    handleMapClick(event) {

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
        const coord = toLonLat(event.coordinate);
        console.log(coord);
        // document.getElementById('lon').value = (coord[0]);
        // document.getElementById('lat').value = (coord[1]);

        // const source = new VectorSource();
        // const features = [];


        // const coords = event.coordinate;
        // const newFeature = new Feature({
        //     geometry: new Point(coords)
        // })


        // newFeature.set('style', createStyle(logo, undefined));
        // features.push();

        // source.addFeatures(features);
        // v = new VectorLayer({
        //     source: source
        // })

        // map.addLayer(v);


    }

    render() {
        return (
            <div ref="mapContainer">
                <form action="http://localhost:8000/api/points" method="post">
                    <input type="number" step="any" name="lon" id="lon" value={this.state.lon}></input>
                    <input type="number" step="any" name="lat" id="lat" value={this.state.lat}></input>
                    <input type="text" name="description" id="description"></input>
                    <button type="submit">Go</button>
                </form>
            </div>
        );
    }

}
export default Map;