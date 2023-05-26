import {GoogleMap, useJsApiLoader, Marker, Autocomplete} from "@react-google-maps/api";
import {useEffect, useState} from "react";

export const GoogleMaps = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [marker, setMarker] = useState([]);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      const {latitude, longitude} = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setMarker([{lat: latitude, lng: longitude}])
    })
  }, []);

  const currentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const {longitude, latitude} = position.coords;
      setMarker([{
        lng: longitude,
        lat: latitude
      }])
    })
  }

  const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    }
  );
  if (!isLoaded) {
    return (
      <main>
        Not loaded
      </main>
    )
  }

  return (
    <>
      <main>
        <div>
          <GoogleMap center={{lat: latitude, lng: longitude}} zoom={15}
                     mapContainerStyle={{width: 50 + "dvw", height: 100 + "dvh"}}
                     onLoad={map => setMap(map)}
                     onClick={event => {
                       setMarker(current => [
                         {
                           lat: event.latLng.lat(),
                           lng: event.latLng.lng()
                         }
                       ])
                     }}
          >
            {marker.map((mark, index) => <Marker key={index} position={mark}/>)}
          </GoogleMap>
          <button
            onClick={() => {
              // map.panTo({lat: latitude, lng: longitude})
              map.panTo(marker[0])
            }}
            className="absolute top-0">Button
          </button>
          <button onClick={() => {
            currentLocation()
          }}>
            Current Locaton
          </button>
        </div>
      </main>
    </>
  );
};
