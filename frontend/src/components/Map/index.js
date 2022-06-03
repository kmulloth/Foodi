import {GoogleMap, LoadScript} from '@react-google-maps/api';
import { useEffect, useState, useCallback } from 'react';

function Map() {

    const [key, setKey] = useState('');
    // const [map, setMap] = useState(null);

    useEffect(() => {
        fetch('/api/maps-api-key').then((res) => {
            res.json().then((data) => {
                setKey(data.key);
            })
        })
    },[setKey] )

    const containerStyle = {
        width: '100%',
        height: '100%'
    }

    const center = {
        lat: 40.7484,
        lng: -73.9857
    }

    // const {isLoaded} = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: key
    // }, [])

    // const [map, setMap] = useState(null)

    //   const onLoad = useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);
    //     setMap(map)
    //   }, [])

    //   const onUnmount = useCallback(function callback(map) {
    //     setMap(null)
    //   }, [])

  return (
    <LoadScript
        googleMapsApiKey={key}
        key={key}
    >
      <GoogleMap
        // mapContainerStyle={containerStyle}

        center={center}
        zoom={10}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
