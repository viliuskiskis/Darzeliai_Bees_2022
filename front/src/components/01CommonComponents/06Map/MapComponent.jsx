import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import icon, { redIcon, greenIcon, blueIcon } from "../../05ReusableComponents/LeafletIcon";

export default function MapComponent(props) {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState();

  function handleClick() {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng);
    });
  }

  function LeafletGeosearch() {
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider: provider,
        style: "bar",
        showPopup: true,
        searchLabel: "Įveskite adresą",
        retainZoomLevel: true,
        marker: {
          icon: redIcon,
          draggable: false,
        }
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

      {props.kindergartens.map(kindergarten =>
        <Marker
          ref={props.openPopup}
          key={kindergarten.id}
          position={[kindergarten.latitude, kindergarten.longitude]}
          icon={blueIcon}
        >
          <Popup>{kindergarten.name + " (" + kindergarten.address + ")"}</Popup>
        </Marker>
      )}


      {/* {props.kindergartens.length > 0 &&
        <Marker
          position={[props.kindergartens[0].latitude,
          props.kindergartens[0].longitude]}
          icon={icon}>
          <Popup>Something else here</Popup>
        </Marker>
      } */}

      {position && (
        <Marker position={position} icon={greenIcon}>
          <Popup>Jūs esate čia</Popup>
        </Marker>
      )}
      {map && <LeafletGeosearch />}
      {map &&
        <div
          className="z-index-1"
          onClick={handleClick}
        >Mano Vieta
        </div>}
    </MapContainer>
  )
}