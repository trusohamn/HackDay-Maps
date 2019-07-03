import React from 'react';

import Form from './Form';

import camping from '../icons/039-tent.svg';
import bonfire from '../icons/010-bonfire.svg';
import viewPoint from '../icons/009-binoculars.svg';

import { Redirect } from 'react-router-dom';


import { MyContext } from '../contexts/MyContextProvider';

import { config } from '../url_config'

import { fromLonLat, toLonLat } from 'ol/proj';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style.js';

const url = config.url.API_URL



const iconMapping = {
    camping: camping,
    bonfire: bonfire,
    view: viewPoint
};

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            lon: 17.862083241832443,
            lat: 59.30184823106963
        });
        // console.log('map constructor');
    }
    componentWillUnmount() {
        // console.log('map is going to unmount!');
    }

    componentDidMount() {
        // console.log('map did mount');
        const extraLayer = new VectorLayer({
            source: new VectorSource({
                features: []
            })
        });
        const featuresLayer = new VectorLayer({
            source: new VectorSource({
                features: []
            })
        });

        const map = new OlMap({
            target: this.refs.mapContainer, //change to createRef API!!
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                extraLayer,
                featuresLayer
            ], view: new View({
                //later check for route and get the id from the localisation
                center: fromLonLat([this.state.lon, this.state.lat]),
                zoom: 11,
            })
        });
        const handleMapClick = (event) => {
            ///getting pointid of the clicked feature ///
            if (this.context.mode === 'explore') {
                // console.log('click!');
                let pointId = null;
                this.state.map.forEachFeatureAtPixel(event.pixel,
                    feature => {
                        console.log(feature.get('id'));
                        pointId = feature.get('id') || null;
                    });

                    console.log(this.props.location);
                    console.log(this.props.match);
                const newPath = pointId === null ? 
                '/location/' : 
                '/location/' + pointId;
                // console.log('Map handleMapClick setNewPath', newPath)
                this.context.setSaveInHistory(true);
                this.context.setRedirect(<Redirect to={newPath}></Redirect>)
            } else if (this.context.mode === 'edit') {
                ///////drawing a point/////////
                const coord = toLonLat(event.coordinate);
                console.log(coord);
                this.setState({
                    lon: coord[0],
                    lat: coord[1]
                });

                const features = [];

                const coords = event.coordinate;
                const newFeature = new Feature({
                    geometry: new Point(coords)
                })

                features.push(newFeature);

                this.state.extraLayer.setSource(
                    new VectorSource({
                        features: features
                    })
                );
            }
        }
        map.on('click', handleMapClick);

        this.setState({
            map: map,
            extraLayer: extraLayer,
            featuresLayer: featuresLayer
        });
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // console.log('map componentdidupdate');
        // console.log(prevState);
        // console.log(this.context);

        if (this.context.data === null) {
            // console.log('updating data');
            fetch(url + '/api/points')
                .then(res => res.json())
                .then(data => {
                    const features = [];
                    data.points.forEach((e) => {
                        const icon = new Icon({
                            opacity: 1,
                            scale: 0.05,
                            src: iconMapping[e.type]
                        });

                        const iconStyle = new Style({
                            image: icon
                        });

                        const coords = fromLonLat(e.localisation);
                        const iconFeature = new Feature({
                            id: e.id,
                            geometry: new Point(coords),
                            name: e.name,
                            description: e.description,
                            rating: e.rating
                        });
                        iconFeature.setStyle(iconStyle);
                        features.push(iconFeature);
                    })

                    this.state.featuresLayer.setSource(
                        new VectorSource({
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