import React from 'react';
import Form from './Form';
import camping from '../icons/039-tent.svg';
import bonfire from '../icons/010-bonfire.svg';
import viewPoint from '../icons/009-binoculars.svg';

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
            lon: 18,
            lat: 60,
            pointId: null
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
                center: ol.proj.fromLonLat([17.862083241832443, 59.301848231069636]),
                zoom: 11,
            })
        });

        map.on('click', this.handleMapClick.bind(this));

        this.setState({
            map: map,
            extraLayer: extraLayer,
            featuresLayer: featuresLayer
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data === null) {
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
                    this.props.setData(data);
                })
                .catch(error => console.log(error));
        }
        else if (this.state.pointId) {
            const pointData = this.props.data.points.find(e =>
                e.id === this.state.pointId);
            // console.log(pointData);
            console.log('setting point description');
            this.props.setPointDescription(pointData);
        }

    }

    handleMapClick(event) {
        ///popout ///

        let pointDescription = {};
        let pointId = null;
        this.state.map.forEachFeatureAtPixel(event.pixel,
            feature => {
                console.log(feature.get('id'));
                pointDescription = {
                    id: feature.get('id'),
                    name: feature.get('name'),
                    description: feature.get('description'),
                    rating: feature.get('rating')
                }
                pointId = feature.get('id');
            });
        this.setState({ pointId: pointId });
        this.props.setPointDescription(pointDescription);

        ///////adding data/////////
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
            <div>
                <div ref="mapContainer" id="mapContainer"></div>
                <Form mode={this.props.mode} lon={this.state.lon} lat={this.state.lat} removeData={() => this.props.setData(null)}></Form>
            </div>
        );
    }

}
export default Map;