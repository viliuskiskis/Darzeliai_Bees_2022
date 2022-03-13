import React, { Component } from "react";
import http from "../../00Services/httpService";
import apiEndpoint from "../../00Services/endpoint";
import swal from "sweetalert";
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
      kindergartens: [],
    };
  }

  componentDidMount() {
    this.getKindergartens();
  }

  getKindergartens() {
    let kindergartens = [];
    http.get(`${apiEndpoint}/api/darzeliai`)
      .then((response) => {
        kindergartens = response.data.map((k) => ({
          value: k.id,
          label: k.name + " (" + k.address + ")",
          disabled: "no",
          latitude: k.latitude,
          longitude: k.longitude,
        }));
        this.setState({
          kindergartens,
        });
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio",
          button: "Gerai"
        })
      })
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
            selectKindergarten={true}
          />
        </div>
      </div>
    )
  }
}
