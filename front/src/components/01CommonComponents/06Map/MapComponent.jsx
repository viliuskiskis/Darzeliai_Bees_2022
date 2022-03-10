import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import icon from "../../05ReusableComponents/LeafletIcon";

export default function MapComponent(props) {
  const [map, setMap] = useState(null);
  // const [position, setPosition] = useState();

  // function FlyToButton() {
  //   const onClick = () => {
  //     map.locate().on("locationfound", function (e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, map.getZoom());
  //     });
  //   };

  //   return (
  //     <button className="button" onClick={onClick}>
  //       Mano vieta žemėlapyje
  //     </button>
  //   )
  // }

  function LeafletGeosearch() {
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        marker: { icon }
      });

      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
    return null;
  }

  return (
    <MapContainer
      style={{ height: "100%" }}
      center={props.center}
      zoom={props.zoom}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={props.center}
        icon={icon}
      >
        <Popup>Put something here</Popup>
      </Marker>
      {/* {position && (
        <Marker position={position} icon={icon}>
          <Popup>Something else here</Popup>
        </Marker>
      )} */}
      {map && <LeafletGeosearch />}
    </MapContainer>
  )
}