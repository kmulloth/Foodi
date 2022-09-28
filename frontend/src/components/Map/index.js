import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)

  //parse return from fetch
  // useEffect(() => {
  //     fetch('/api/maps-api-key').then((res) => {
  //         res.json().then((data) => {
  //             console.log(data.key)
  //             setKey(data.key);
  //         })
  //     })
  // },[setKey] )
