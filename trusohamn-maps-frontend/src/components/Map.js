import React from 'react';
// import { Link } from 'react-router-dom';

import Form from './Form';

import camping from '../icons/039-tent.svg';
import bonfire from '../icons/010-bonfire.svg';
import viewPoint from '../icons/009-binoculars.svg';

import { MyContext } from '../contexts/MyContextProvider';

import { config } from '../url_config'
const url = config.url.API_URL

const ol = require('openlayers');
require('openlayers/css/ol.css');


const iconMapping = {
    camping: camping,
    bonfire: bonfire,
    view: viewPoint
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            lon: 17.862083241832443,
            lat: 59.30184823106963
        });
    }

    componentDidMount() {
        const extraLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: []
            })
        });
        const featuresLayer = new ol.layer.Vector({
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
                extraLayer,
                featuresLayer
            ], view: new ol.View({
                //later check for route and get the id from the localisation
                center: ol.proj.fromLonLat([this.state.lon, this.state.lat]),
                zoom: 11,
            })
        });
        const handleMapClick = (event) => {
            ///getting pointid of the clicked feature ///
    
            let pointId = null;
            this.state.map.forEachFeatureAtPixel(event.pixel,
                feature => {
                    console.log(feature.get('id'));
                    pointId = feature.get('id');
                });
            this.context.setPointId(pointId);
            // window.location.pathname = "/" + pointId;
            // change to url withour refreshing!!!
    
            ///////drawint a point/////////
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
        map.on('click', handleMapClick);

        this.setState({
            map: map,
            extraLayer: extraLayer,
            featuresLayer: featuresLayer
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.context.data === null) {
            console.log('updating data');
            fetch(url + '/api/points')
                .then(res => res.json())
                .then(data => {
                    const features = [];
                    data.points.forEach((e) => {
                        const icon = new ol.style.Icon({
                            opacity: 1,
                            scale: 0.05,
                            src: iconMapping[e.type]
                        });

                        const iconStyle = new ol.style.Style({
                            image: icon
                        });

                        const coords = ol.proj.fromLonLat(e.localisation);
                        const iconFeature = new ol.Feature({
                            id: e.id,
                            geometry: new ol.geom.Point(coords),
                            name: e.name,
                            description: e.description,
                            rating: e.rating
                        });
                        iconFeature.setStyle(iconStyle);
                        features.push(iconFeature);
                    })

                    this.state.featuresLayer.setSource(
                        new ol.source.Vector({
                            features: features
                        })
                    );
                    this.context.setData(data);
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        return (
            <div>
                <div ref="mapContainer" id="mapContainer"></div>
                <Form lon={this.state.lon} lat={this.state.lat}></Form>
            </div>
        );
    }
}

Map.contextType = MyContext;
export default Map;