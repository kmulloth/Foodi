import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocoder from 'react-native-geocoding';

const containerStyle = {
  width: '100%',
  height: '100%'
};

function MapForm({lat, setLat, lng, setLng, location, setLocation, searchRes, setSearchRes, locationMethod, setLocationMethod}) {

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
    if (lat != '' && lng != '' && locationMethod == 'map') {
    Geocoder.from(lat, lng).then(json => {
      // console.log(lat, lng, json.results[0].formatted_address)
      let address = json.results[0].formatted_address
        setLocation(address)
    })}
  }, [lng])

  useEffect(() => {
    if (location && locationMethod == 'address') {
      Geocoder.from(location).then(json => {
        console.log(typeof json.results[0].geometry.location.lat)
        if(json.results[0].formatted_address != location){
          setSearchRes(json.results[0].formatted_address)
          setLat(json.results[0].geometry.location.lat)
          setLng(json.results[0].geometry.location.lng)
        }
    }).catch(error => console.warn(error))}
  }, [location])

  Geocoder.init(key)

  return key && (
    <LoadScript
      googleMapsApiKey={key}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={lat ? {lat: lat, lng: lng} : defaultCenter}
        zoom={10}
        clickableIcons={false}
        onClick={((e) => {
          setLocationMethod('map')
          setLat(e.latLng.toJSON().lat)
          setLng(e.latLng.toJSON().lng)
        })}
      >
        {lat && <Marker position={{lat: lat, lng: lng}} />}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default MapForm
