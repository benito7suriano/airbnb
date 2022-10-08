import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const DashboardMap = ({ properties }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_googleMapsApiKey,
  })

  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const center = {
    lat: 19.016524,
    lng: -69.986151,
  }

  const [map, setMap] = React.useState(null)

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
      zoom={8}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      {properties.map((property, idx) => (
        <Marker
          key={idx}
          position={{
            lat: property?.location?.lat,
            lng: property?.location?.lng,
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(DashboardMap)
