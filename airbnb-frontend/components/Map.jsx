import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const Map = ({ location }) => {
  const [map, setMap] = React.useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_googleMapsApiKey,
  })

  const containerStyle = {
    width: '100%',
    height: '400px',
  }

  const center = {
    lat: location.lat,
    lng: location.lng,
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={{ lat: location.lat, lng: location.lng }} />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(Map)
