import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { redIcon, greenIcon, blueIcon } from "../../05ReusableComponents/LeafletIcon";

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
          id={kindergarten.id}
          key={kindergarten.id}
          position={[kindergarten.latitude, kindergarten.longitude]}
          icon={blueIcon}
        >
          <Popup>{kindergarten.name + " (" + kindergarten.address + ")"}</Popup>
        </Marker>
      )}

      {position && (
        <Marker
          id="yourLocation"
          key="yourLocation"
          position={position}
          icon={greenIcon}>
          <Popup>Jūs esate čia</Popup>
        </Marker>
      )}

      {map &&
        <LeafletGeosearch />
      }

      {map &&
        <div
          id="ManoVietaButton"
          className="mano-vieta-button"
          onClick={handleClick}
        >Mano Vieta
        </div>
      }

    </MapContainer>
  )
}