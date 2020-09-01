import * as LocationConstant from './location_constant'
import { extend } from 'lodash'


export default function locationReducer(state={ 
    locations: [],
    heatmap: [],
    fetching: false,
    markerPosition: {
      lat: 1.3139935,
      lng: 103.8267362, 
      radius: 0
    } 
  }, action) {

    switch (action.type) {
      case LocationConstant.FETCH_YOOSE: {
        return {...state, fetching: true}
      }
      case LocationConstant.FETCH_YOOSE_REJECTED: {
        return {...state, fetching: false, error: action.payload}
      }
      case LocationConstant.FETCH_YOOSE_FULFILLED: {
        return {...state, locations: action.payload, fetching: false}
      }
      case LocationConstant.FETCH_CLEAR_LOCATION: {
        return {...state, locations: action.payload}
      }
      case LocationConstant.FETCH_POINT: {
        return {...state, fetching: true}
      }
      case LocationConstant.FETCH_POINT_REJECTED: {
        return {...state, fetching: false, error: action.payload}
      }
      case LocationConstant.FETCH_POINT_FULFILLED: {
        return {...state, heatmap: action.payload, fetching: false}
      }
      case LocationConstant.FETCH_CLEAR_HEAT_MAP:{
        return {...state, heatmap: action.payload}
      }
    }

    return state
}
