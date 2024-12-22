import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesProvider";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useGetLocation from "./../hooks/useGetLocation";
import useUrlPosition from "../hooks/useUrlPosition";
export default function Map() {
  const { cities } = useCities();
  const {
    position: positionFromHook,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGetLocation();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  // eslint-disable-next-line no-unused-vars

  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (positionFromHook) {
      setMapPosition([positionFromHook.lat, positionFromHook.lng]);
    }
  }, [positionFromHook]);

  return (
    <div className={styles.mapContainer}>
      {!positionFromHook && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <div>
                  <h2>{city.emoji}</h2>
                  <h3>{city.cityName}</h3>
                  <p>{city.date}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
// becouse when we click on the map,
//  we want to navigate to the form page and we want to pass the lat and lng to the form page
function DetectClick() {
  const nav = useNavigate();

  useMapEvents({
    click: (e) => nav(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
