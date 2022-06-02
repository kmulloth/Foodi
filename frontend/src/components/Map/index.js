import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
}

const center = {
    lat: 40.7484,
    lng: -73.9857
}

function Map() {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyB9LhW6fM77UVbwb9hpleWmiZ1t7MmfmQc'
    })

    return isLoaded && (
        <div style={{ position: 'absolute', width: '40%', height: '100vh', zIndex: '-1'}} id='map'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            ></GoogleMap>
        </div>
    )
}

export default Map;
