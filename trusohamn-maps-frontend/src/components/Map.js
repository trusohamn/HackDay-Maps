//externals
import React from 'react';
import Form from './Form';
import logo from '../icons/039-tent.svg';

//open layers and styles
var ol = require('openlayers');
require('openlayers/css/ol.css');

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
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
                const fill = new ol.style.Fill({
                    color: 'rgba(255,0,0,0.4)'
                });
                const stroke = new ol.style.Stroke({
                    color: '#3399CC',
                    width: 1.25
                });
                const circle = new ol.style.Circle({
                    fill: fill,
                    stroke: stroke,
                    radius: 5
                });

                const icon = new ol.style.Icon({
                    // anchor: [0.5, 0.5],
                    // size: [52, 52],
                    // offset: [52, 0],
                    opacity: 1,
                    scale: 0.03,
                    src: logo
                });

                const iconStyle = new ol.style.Style({
                    image: icon
                });

                data.points.forEach((e) => {
                    const coords = ol.proj.fromLonLat(e.localisation);
                    const iconFeature = new ol.Feature({
                        geometry: new ol.geom.Point(coords),
                        name: e.description
                    })
                    iconFeature.setStyle(iconStyle);
                    features.push(iconFeature);
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

        var feature = this.state.map.forEachFeatureAtPixel(event.pixel,
            feature => {
                console.log(feature.get('name'));
            });
        ////////////////
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
                <Form lon={this.state.lon} lat={this.state.lat}></Form>
            </div>
        );
    }

}
export default Map;