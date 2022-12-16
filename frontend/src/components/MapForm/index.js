import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.745,
  lng: -74.023
};

function MapForm({lat, setLat, lng, setLng}) {

  const [key, setKey] = useState()

  useEffect(() => {
        fetch('/api/maps-api-key').then((res) => {
            res.json().then((data) => {
                setKey(data.key);
            })
        })
  },[key] )

  return key && (
    <LoadScript
      googleMapsApiKey={key}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={(e => {
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
