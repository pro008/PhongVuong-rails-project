import axios from "axios";
import * as LocationConstant from '../reducers/location_constant'

export function fetchGoogleTexts(text) {
  return function(dispatch) {
    dispatch({type: "FETCH_TWEETS"});
    axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDwUMwOadFZp6g_Vv5vqfej3mBw2-_KYYo",{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        dispatch({type: "FETCH_TWEETS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }
}

export function fetchDashboardLocation(text) {
  return function(dispatch) {
    dispatch({type: LocationConstant.FETCH_YOOSE});
    axios.get(`https://dashboard.yoose.com/demo_free_maps/fetch_google_location?input=${text}`)
      .then((response) => {
        dispatch({type: LocationConstant.FETCH_YOOSE_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: LocationConstant.FETCH_YOOSE_REJECTED, payload: err})
      })
  }
}

export function fetchDashboardSubLocation(markerPosition) {
  return function(dispatch) {
    dispatch({type: LocationConstant.FETCH_POINT});
    axios.get(`https://dashboard.yoose.com/demo_free_maps/fetch_ping_pong?lat=${markerPosition.lat}&lng=${markerPosition.lng}&radius=${markerPosition.radius}`)
      .then((response) => {
        dispatch({type: LocationConstant.FETCH_POINT_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: LocationConstant.FETCH_POINT_REJECTED, payload: err})
      })
  }
}

export function fetchClearLocation(text) {
  return { type: LocationConstant.FETCH_CLEAR_LOCATION, payload: [] }
}

export function fetchClearHeatMap(text) {
  return { type: LocationConstant.FETCH_CLEAR_HEAT_MAP, payload: [] }
}