import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
}

function Bizmap({lat, lng}) {

    const [key, setKey] = useState()

    useEffect(() => {
        fetch('/api/maps-api-key').then((res) => {
            res.json().then((data) => {
                setKey(data.key);
            })
        })
    },[key])

    return key && (
      <LoadScript
          googleMapsApiKey={key}
      >
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={{lat: lat, lng: lng}}
              zoom={15}
              clickableIcons={false}
          >
              <Marker position={{lat: lat, lng: lng}}/>
          </GoogleMap>
      </LoadScript>
    )
}

export default Bizmap
