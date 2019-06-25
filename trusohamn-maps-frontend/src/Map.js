//externals
import React from 'react';

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
        var extraLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: []
            })
        });

        var map = new ol.Map({
            target: this.refs.mapContainer,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                extraLayer
            ], view: new ol.View({
                center: ol.proj.fromLonLat([17.762083241832443, 59.401848231069636]),
                zoom: 13,
            })
        });

        map.on('click', this.handleMapClick.bind(this));

        this.setState({
            map: map,
            extraLayer: extraLayer
        });

        fetch('http://localhost:8000/api/points')
            .then(res => res.json())
            .then(data => {
                const source = new ol.source.Vector();
                const features = [];

                data.points.forEach((e) => {
                    const coords = ol.proj.fromLonLat(e.localisation);
                    console.log(e.localisation);
                    console.log(coords);
                    features.push(new ol.Feature({
                        geometry: new ol.geom.Point(coords)
                    }));
                })

                source.addFeatures(features);

                const featuresLayer = new ol.layer.Vector({
                    source: source
                })
                
                map.addLayer(featuresLayer);

                this.setState({
                    map: map,
                    featuresLayer: featuresLayer
                });
         
            })
            .catch(error => console.log(error));

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('maps did update');
       
    }

    handleMapClick(event) {

       
        const coord = ol.proj.toLonLat(event.coordinate);
        console.log(coord);
        this.setState({
            lon: coord[0],
            lat: coord[1] 
        });

        const features = [];

        const coords = event.coordinate;
        const newFeature = new ol.Feature({
            geometry: new ol.geom.Point(coords)
        })

        features.push(newFeature);

        this.state.extraLayer.setSource(
                new ol.source.Vector({
                    features: features
                })
            );

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