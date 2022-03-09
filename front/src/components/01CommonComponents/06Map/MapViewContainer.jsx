import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class MapViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [
        54.69440014996402,
        25.28081236030032
      ],
      zoom: 13
    }
  }

  render() {
    return (
      <div className="container pt-4 " >
        <div className="map-container">
          <MapContainer center={this.state.center} zoom={this.state.zoom}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={this.state.center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    )
  }
}
