import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.745,
  lng: -74.023
};

function Map({businesses}) {
  const [selectedBiz, setSelectedBiz] = useState()
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
        onClick={() => setSelectedBiz(null)}
      >
        { Object.values(businesses).map(business => (
          <Marker
              key={business?.id}
              position={{lat: business?.lat, lng: business?.lng}}
              onClick={() => setSelectedBiz(business)}
            />
        ))}
        {selectedBiz && (
          <InfoWindow
            position={{lat: selectedBiz.lat, lng: selectedBiz.lng}}
            onCloseClick={() => setSelectedBiz(null)}
          >
            <div className='info-window'>
              <NavLink to={`/businesses/${selectedBiz.id}`}>
                <img src={selectedBiz.imgUrl} alt={selectedBiz.name} />
                <h3>{selectedBiz.name}</h3>
                <p>{selectedBiz.cusine} {selectedBiz.type === 'truck' ? 'Food Truck' : selectedBiz.type}</p>
                <div
                    className="Stars"
                    style={{'--rating': selectedBiz?.rating.toFixed(1)}}
                    aria-label={`Rating of this selectedBiz is ${selectedBiz?.rating / 5 * 100}%`}
                />
              </NavLink>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
