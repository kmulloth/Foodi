import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.745,
  lng: -74.023
};

function Map({businesses}) {
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
      >
        { Object.values(businesses).map(business => (
          <Marker
              key={business?.id}
              position={{lat: business?.lat, lng: business?.lng}}
            />
          ))}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
