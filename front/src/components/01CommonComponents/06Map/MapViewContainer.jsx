import React, { Component } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MapComponent from "./MapComponent";
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const provider = new OpenStreetMapProvider();

export default class MapViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [
        54.69440014996402,
        25.28081236030032
      ],
      zoom: 13,
      latLonList: []
    }
  }

  componentDidMount() {
    // provider.search({ query: "Gumbinės 138, Šiauliai, Lithuania" })
    //   .then(response => {
    //     alert("response: " + response[0].raw.lat + " " + response[0].raw.lon);
    //   })
    this.searchForAddress("Pašilaičių g. 10");
  }

  searchForAddress(address) {
    provider.search({ query: address + ", Vilnius, Lithuania" })
      .then(response => {
        this.setState({
          latLonList: [
            ...this.state.latLonList,
            {
              address: address,
              latitude: response[0].raw.lat,
              longitude: response[0].raw.lon
            }
          ]
        })
      })
  }


  render() {
    return (
      <div className="container pt-4 " >
        <div className="map-container">
          <MapComponent
            center={this.state.center}
            zoom={this.state.zoom}
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
        <h6>Latitude and longitude list:</h6>
        {this.state.latLonList.map(data => <p>{JSON.stringify(data)}</p>)}
      </div>
    )
  }
}
