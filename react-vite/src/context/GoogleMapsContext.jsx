import {GoogleMap, useJsApiLoader, MarkerF} from "@react-google-maps/api";
import React, {createContext, useContext, useEffect, useState} from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete"
export const GoogleMapsContext = createContext();
const libraries = ['places'];
export const GoogleMapsProvider = ({children}) => {
  const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
      libraries
    }
  );
  const [placeId, setPlaceId] = useState('');
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [marker, setMarker] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setMarker([{lat: latitude, lng: longitude}])
    })
  }, []);

  const getAddress = async (lat, lng) => {
    if (isLoaded) {
      const geoCode = new google.maps.Geocoder();
      await geoCode.geocode({location: {lat, lng}})
        .then((res) => {
          if (res.results[0]) {
            setAddress(res.results[0].formatted_address);
            setPlaceId(res.results[0].place_id);
          } else {
            setAddress('No Results Found');
          }
        }).catch((e) => {
          console.log(e);
        })
    }
  }
  const [tempAddress, setTempAddress] = useState('');
  const handleAddressChange = (event) => {
    setTempAddress(event.target.value);
  }

  const PlacesAutoComplete = ({setMarker}) => {
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
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
      setLatitude(lat);
      setLongitude(lng);
      setMarker([{lat, lng}]);
    };
    return (
      <>
        <input type="text"
               placeholder="Search..."
               className="w-[100%] px-12 search-bar py-1 border-none"
               value={value}
               onChange={({target}) => setValue(target.value)}/>
        <div className="flex flex-col mt-3">
          {status === "OK" && data.map(({place_id, description}) => {
            return (
              <button className="text-start px-4 py-2 border" onClick={()=>{handleSelect(description)}} key={place_id}>{description}</button>
            )
          })}
        </div>
      </>
    )
  }

  const GoogleMaps = ({height}) => {
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    useEffect(() => {
      getAddress(latitude, longitude)
    }, [latitude, longitude]);

    const currentLocation = async () => {
      navigator.geolocation.getCurrentPosition(position => {
        const {longitude, latitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setMarker([{
          lng: longitude,
          lat: latitude
        }])
      })
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
        {/*<div className="mb-3">*/}
          <PlacesAutoComplete setMarker={setMarker}/>
        {/*</div>*/}
        <div className="">
          <div className="relative flex gap-x-2">
            <div className="absolute bottom-0 z-20">
              <button className="border bg-blueBase text-whiteFactory px-2 py-1"
                      onClick={() => {
                        map.panTo(marker[0])
                      }}>
                Pan Current Location
              </button>
              <button
                title="Current Location" className="bg-white shadow-xl px-2 py-2"
                onClick={async () => await currentLocation()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path className="text-tealBase" strokeLinecap="round" strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path className="text-tealBase" strokeLinecap="round" strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
              </button>
            </div>
            <GoogleMap
              center={{lat: latitude, lng: longitude}}
              zoom={15}
              mapContainerStyle={{width: 100 + "%", height: height + "px"}}
              onLoad={map => setMap(map)}
              options={{
                disableDefaultUI: true,
                fullscreenControl: true,
                zoomControl: true,
              }}
              onClick={async (event) => {
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
                setLongitude(event.latLng.lng());
                setLatitude(event.latLng.lat());
              }}>
              {marker.map((mark, index) => <MarkerF key={index} position={mark}/>)}
            </GoogleMap>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <GoogleMapsContext.Provider value={{
        setTempAddress,
        tempAddress,
        setLatitude,
        latitude,
        setLongitude,
        longitude,
        // PlacesAutoComplete,
        placeId,
        setPlaceId,
        GoogleMaps,
        address,
        setAddress,
        handleAddressChange,
      }}>
        {children}
      </GoogleMapsContext.Provider>
    </>
  );
};

