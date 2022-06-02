import {GoogleMap, LoadScript, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
}

const center = {
    lat: -3,
    lng: -38
}

function Map() {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyB9LhW6fM77UVbwb9hpleWmiZ1t7MmfmQc'
    })

    return isLoaded && (
        <div style={{position: 'absolute', width: '100vw', height: '100vh'}}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            ></GoogleMap>
        </div>
    )
}

export default Map;
