import React, { Component, Fragment } from 'react'
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import swal from 'sweetalert';
import AuthContext from "../../00Services/AuthContext";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const customMarker = new L.icon({
  iconUrl: 'leaflet/src/marker.svg',
  iconSize: [56, 72],
  iconAnchor: [26, 72],
});

const MyPopupMarker = ({ content, position }) => (
  <Marker position={position} icon={customMarker} >
    <Popup>{content}</Popup>
  </Marker>
)

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <Fragment>{items}</Fragment>
}

const markers = [
  { key: 'marker1', position: [54.68, 25.27], content: 'My first popup' },
  { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
  { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' },
]

export default class UserMainMapContainer extends Component {

  render() {
    return (
      <div id="map">
        <MapContainer center={[54.687, 25.279]} zoom={12} style={{ height: "550px", width: "auto", margin: "2%" }} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMarkersList markers={markers} />
          <Marker position={[54.675, 25.265]}>
            <Popup>
              Info apie darzelius. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  }
}
