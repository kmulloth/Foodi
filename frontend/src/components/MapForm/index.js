import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocoder from 'react-native-geocoding';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 40.745,
  lng: -74.023
};

function MapForm({lat, setLat, lng, setLng, setLocation, center}) {

  const [key, setKey] = useState()

  useEffect(() => {
        fetch('/api/maps-api-key').then((res) => {
            res.json().then((data) => {
                setKey(data.key);
            })
        })
  },[key] )

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
        onClick={(e => {
            setLat(e.latLng.toJSON().lat)
            setLng(e.latLng.toJSON().lng)
            Geocoder.from(lat, lng).then(json => {
              console.log(json.results[0].formatted_address)
              setLocation(json.results[0].formatted_address)
            })
        })}
      >
        <Marker position={{lat: lat, lng: lng}} />
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default MapForm
