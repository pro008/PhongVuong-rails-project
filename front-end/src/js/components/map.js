import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle, Rectangle } from "react-google-maps"


const MapContainer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDwUMwOadFZp6g_Vv5vqfej3mBw2-_KYYo&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    // 
    lifecycle({
        componentWillMount() {

            const refs = {}

            this.setState({
                position: null,
                onMarkerMounted: ref => {
                    refs.marker = ref;
                },

                onPositionChanged: () => {
                    const position = refs.marker.getPosition()
                    this.props.onChangeLocation({lat: position.lat(), lng: position.lng()})
                }
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap 
      defaultZoom={13} 
      center={{ 
        lat: props.location.lat,
        lng: props.location.lng}}
      >
        
        {props.hideMarker && <Marker position={{ lat: parseFloat(props.location.lat), lng: parseFloat(props.location.lng), radius: parseFloat(props.location.radius)}}
                                        draggable={true} ref={props.onMarkerMounted} onPositionChanged={props.onPositionChanged} />}


        {props.marker_list.map((marker, index) => (
            <Marker key={index} position={{lat: parseFloat(marker.Latitude), lng: parseFloat(marker.Longtitude), radius: parseFloat(marker.Radius)}} />))
        }
        {props.marker_list.map((marker, index) => (
            <Circle
              key={index}
              options={{
                strokeColor: '#00ffff',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#808080',
                fillOpacity: 0.35
              }}
              center={{lat: parseFloat(marker.Latitude), lng: parseFloat(marker.Longtitude)}}
              radius={parseFloat(marker.Radius)}
            />))
        }

        {props.heatmap.map((point, index) => (
          <Circle
            key={index}
            options={{
              strokeWeight: 0,
              fillColor: point.color,
              fillOpacity: point.opacity
            }}
            center={{lat: parseFloat(point.lat), lng: parseFloat(point.lng)}}
            radius={parseFloat(point.radius)}
          />))
        }
        

        <Circle
          key={1}
          options={{
            strokeColor: '#00ffff',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0
          }}
          center={{lat: parseFloat(props.location.lat), lng: parseFloat(props.location.lng)}}
          radius={props.location.radius}
        />


    </GoogleMap>
    )

export default MapContainer;