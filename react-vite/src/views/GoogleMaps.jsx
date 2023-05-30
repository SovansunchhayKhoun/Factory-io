import {GoogleMap, useJsApiLoader, Marker, Autocomplete, MarkerF} from "@react-google-maps/api";
import {useEffect, useState} from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
const libraries = ['places'];
export const GoogleMaps = (props) => {
  const {height} = props;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setMarker([{lat: latitude, lng: longitude}])
    })
  }, []);

  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [marker, setMarker] = useState([]);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
      libraries
    }
  );
  const [selected, setSelected] = useState(null);
  const currentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const {longitude, latitude} = position.coords;
      setMarker([{
        lng: longitude,
        lat: latitude
      }])
    })
    console.log(latitude)
    console.log(longitude)
  }

  const PlacesAutoComplete = ({setMarker}) => {
    const {
      ready,
      value,
      setValue,
      suggestions: {status, data},
      clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({address})
      const {lat, lng} = await getLatLng(results[0]);
      // setSelected({lat, lng});
      setMarker([{lat, lng}]);
      setTimeout(() => {
        map.panTo({lat, lng})
      }, 100);
    };

    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput className="w-full p-1 border" placeholder={'search'} value={value}
                       onChange={event => setValue(event.target.value)} disable={!ready}/>
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && data.map(({place_id, description}) => {
              return <ComboboxOption key={place_id} value={description}/>
            })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    )
  }

  if (!isLoaded) {
    return (
      <>
        Loading...
      </>
    )
  }
  return (
    <>
      <div className={'flex gap-x-2 mb-3'}>
        {/*<button className="border px-2 py-1"*/}
        {/*        onClick={() => {*/}
        {/*          // map.panTo({lat: latitude, lng: longitude})*/}
        {/*          map.panTo(marker[0])*/}
        {/*        }}>Pan Current Location*/}
        {/*</button>*/}
        {/*<button className="border px-2 py-1" onClick={() => {*/}
        {/*  currentLocation()*/}
        {/*}}>*/}
        {/*  Current Location*/}
        {/*</button>*/}
        {/*<PlacesAutoComplete setMarker={setMarker}/>*/}
      </div>

      <div className="">
        <div className="relative flex gap-x-2">
          <div className="absolute bottom-0 z-20">
            <button className="border bg-blueBase text-whiteFactory px-2 py-1"
                    onClick={() => {
                      // map.panTo({lat: latitude, lng: longitude})
                      map.panTo(marker[0])
                    }}>Pan Current Location
            </button>
            <button title="Current Location" className="bg-white shadow-xl px-2 py-2" onClick={() => {
              currentLocation()
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path className="text-tealBase" strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path className="text-tealBase" strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </button>
            <PlacesAutoComplete setMarker={setMarker}/>
          </div>

          <GoogleMap
            center={{lat: latitude, lng: longitude}} zoom={15}
            mapContainerStyle={{width: 100 + "%", height: height + "px"}}
            onLoad={map => setMap(map)}
            options={{
              disableDefaultUI: true,
              fullscreenControl: true,
              zoomControl: true,
            }}
            onClick={event => {
              setTimeout(() => {
                map.panTo({
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng()
                })
              }, 500)
              setMarker([
                {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng()
                }
              ])
            }}>
            {marker.map((mark, index) => <MarkerF key={index} position={mark}/>)}
          </GoogleMap>
        </div>
        {/*<div>{JSON.stringify(marker[0])}</div>*/}
      </div>
    </>
  );
};
