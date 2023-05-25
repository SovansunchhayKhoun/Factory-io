import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";


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
        <GoogleMap center={center} mapContainerStyle={{width: 100+"vw", height: 100+"vh"}} zoom={15}>

        </GoogleMap>
      </main>
    </>
  );
};
