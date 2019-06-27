import React from 'react';
import Form from './Form';
import logo from '../icons/039-tent.svg';


const ol = require('openlayers');
require('openlayers/css/ol.css');

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            lon: 18,
            lat: 60,
            data: null
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
                center: ol.proj.fromLonLat([17.762083241832443, 59.401848231069636]),
                zoom: 13,
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
        if (this.state.data === null) {
            console.log('updating data');
            fetch('http://localhost:8000/api/points')
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        data: data
                    });

                    const features = [];

                    const icon = new ol.style.Icon({
                        opacity: 1,
                        scale: 0.05,
                        src: logo
                    });

                    const iconStyle = new ol.style.Style({
                        image: icon
                    });

                    data.points.forEach((e) => {
                        const coords = ol.proj.fromLonLat(e.localisation);
                        const iconFeature = new ol.Feature({
                            geometry: new ol.geom.Point(coords),
                            name: e.name,
                            description: e.description
                        });
                        iconFeature.setStyle(iconStyle);
                        features.push(iconFeature);
                    })

                    this.state.featuresLayer.setSource(
                        new ol.source.Vector({
                            features: features
                        })
                    );
                })
                .catch(error => console.log(error));
        }
    }

    handleMapClick(event) {
        ///popout ///
        this.state.map.forEachFeatureAtPixel(event.pixel,
            feature => {
                console.log(feature.get('name'));
                this.props.setPointDescription({
                    name: feature.get('name'),
                    description: feature.get('description')
                });
            });


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
            <div ref="mapContainer">
                <Form lon={this.state.lon} lat={this.state.lat} removeData={() => this.setState({ data: null })}></Form>
            </div>
        );
    }

}
export default Map;