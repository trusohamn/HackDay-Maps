import React from 'react';

import Form from './Form';
import Loader from './Loader'


import camping from '../icons/039-tent.svg';
import bonfire from '../icons/010-bonfire.svg';
import viewPoint from '../icons/009-binoculars.svg';

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

  constructor(props){
    super(props);
    this.map = null;
    
    this.center = () => {
      this.map.getView().setCenter(fromLonLat(this.context.getPointIdData().localisation));
      this.map.getView().setZoom(13);
    }
  }
  
  componentDidMount() {
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

    this.map = new OlMap({
      target: this.refs.mapContainer, //change to createRef API!!
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        extraLayer,
        featuresLayer
      ], view: new View({
        center: fromLonLat([this.context.lon, this.context.lat]),
        zoom: 6,
      })
    });
    const handleMapClick = (event) => {
      if (this.context.mode === 'explore') {
        let pointId = null;
        this.map.forEachFeatureAtPixel(event.pixel,
          feature => {
            pointId = feature.get('id') || null;
          });

        const newPath = pointId === null ?
          '/location/' :
          '/location/' + pointId;
        this.props.history.push(newPath);

      } else if (this.context.mode === 'edit') {
        ///////drawing a point/////////
        const coord = toLonLat(event.coordinate);
        this.context.setLon(coord[0]);
        this.context.setLat(coord[1]);

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
    this.map.on('click', handleMapClick);

    this.setState({
      // map: map,
      extraLayer: extraLayer,
      featuresLayer: featuresLayer
    });
  }

  componentDidUpdate() {

    if (this.context.data === null) {
      fetch(url + '/api/points')
        .then(res => res.json())
        .then(data => {
          const features = [];
          data.forEach((e) => {
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
              id: e._id,
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
        <Loader size='100' loading={!this.context.data}></Loader>
        <div ref="mapContainer" id="mapContainer"></div>
        {(!this.context.pointId || this.context.mode === 'edit') ?
      '' :
        <button onClick={this.center}>center on location</button>
        }
        <Form/>
      </div>
    );
  }
}

Map.contextType = MyContext;
export default Map;