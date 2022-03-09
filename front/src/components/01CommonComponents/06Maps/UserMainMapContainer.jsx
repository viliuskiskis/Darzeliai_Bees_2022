import React, { Component } from 'react'
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import swal from 'sweetalert';
import AuthContext from "../../00Services/AuthContext";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default class UserMainMapContainer extends Component {

  render() {
    return (
      <div>
        <MapContainer center={[51.505, -0.09]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  }
}
