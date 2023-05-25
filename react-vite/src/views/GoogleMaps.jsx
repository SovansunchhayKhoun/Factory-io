import {GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api";

const center = {lat:11.65309141165872, lng: 104.91172658264043 }
export const GoogleMaps = () => {

  const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
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
          <GoogleMap center={center} mapContainerStyle={{width: 100+"dvw", height: 100+"dvh"}} zoom={15}>
            <Marker position={center}/>
          </GoogleMap>
          <button className="absolute top-0">Button</button>
        </div>
      </main>
    </>
  );
};
