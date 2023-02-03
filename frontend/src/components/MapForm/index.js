import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocoder from 'react-native-geocoding';

const containerStyle = {
  width: '100%',
  height: '100%'
};



function MapForm({lat, setLat, lng, setLng, location, setLocation, center}) {

  const [key, setKey] = useState()
  const [defaultCenter, setDefaultCenter] = useState()

  useEffect(() => {
    if (localStorage.getItem("userLocation")) {
      setDefaultCenter(JSON.parse(localStorage.getItem("userLocation")));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          localStorage.setItem("userLocation", JSON.stringify(location));
          setDefaultCenter(location);
        },
        () => {
          setDefaultCenter({
              lat: 40.745,
              lng: -74.023
          })},
          {enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: Infinity}
      );
    }
  }, [])

  useEffect(() => {
        fetch('/api/maps-api-key').then((res) => {
            res.json().then((data) => {
                setKey(data.key);
            })
        })
  },[key] )

  useEffect(() => {
    if (lat != '' && lng != '') {
    Geocoder.from(lat, lng).then(json => {
      console.log(lat, lng, json.results[0].formatted_address)
      let address = json.results[0].formatted_address
        setLocation(address)
    })}
  }, [lng])

  Geocoder.init(key)

  return key && (
    <LoadScript
      googleMapsApiKey={key}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || defaultCenter}
        zoom={10}
        clickableIcons={false}
        onClick={((e) => {
          setLat(e.latLng.toJSON().lat)
          setLng(e.latLng.toJSON().lng)
        })}
      >
        <Marker position={{lat: lat, lng: lng}} />
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default MapForm
