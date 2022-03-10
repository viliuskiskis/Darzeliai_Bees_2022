import React, { Component } from "react";
import http from "../../00Services/httpService";
import apiEndpoint from "../../00Services/endpoint";
import swal from "sweetalert";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MapComponent from "./MapComponent";
// import { OpenStreetMapProvider } from 'leaflet-geosearch';

// const provider = new OpenStreetMapProvider();

export default class MapViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [
        54.70440014996402,
        25.28081236030032
      ],
      zoom: 12,
      kindergartens: []
    };
  }

  componentDidMount() {
    this.getKindergartens();
  }

  getKindergartens() {
    http.get(`${apiEndpoint}/api/darzeliai`)
      .then((response) => {
        this.setState({
          kindergartens: response.data
        });
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio",
          button: "Gerai"
        })
      })
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      })
    }
  }


  // searchForAddress(address) {
  //   provider.search({ query: address + ", Vilnius, Lithuania" })
  //     .then(response => {
  //       this.setState({
  //         latLonList: [
  //           ...this.state.latLonList,
  //           {
  //             address: address,
  //             latitude: response[0].raw.lat,
  //             longitude: response[0].raw.lon
  //           }
  //         ]
  //       })
  //     })
  // }

  render() {
    return (
      <div className="container pt-4 " >
        <div className="map-view-container">
          <MapComponent
            center={this.state.center}
            zoom={this.state.zoom}
            kindergartens={this.state.kindergartens}
            openPopup={this.openPopup}
          />

          {/* <MapContainer center={this.state.center} zoom={this.state.zoom}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={this.state.center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer> */}
        </div>
      </div>
    )
  }
}
