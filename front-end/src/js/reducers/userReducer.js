import * as UserConstant from './user_constant'
import { extend } from 'lodash'


export default function userReducer(state={ 
    fetching: false,
    status: null,
    loginStatus: "PENDING",
    message: "",
    user: {} 
  }, action) {

    switch (action.type) {
      case UserConstant.USER_STATUS:
      case UserConstant.LOGGIN_USER:
      case UserConstant.REGISTRY_USER:
        return {...state, fetching: true}
      case UserConstant.LOGGIN_USER_REJECTED:
      case UserConstant.REGISTRY_USER_REJECTED:
        return {...state, fetching: false, message: action.payload.message}
      case UserConstant.LOGGIN_USER_FULFILLED:
      case UserConstant.REGISTRY_USER_FULFILLED: {
        return {...state, fetching: false, message: action.payload.message, loginStatus: "SUCCESS",
                          user: action.payload.user, status: action.payload.status}
      }
      case UserConstant.LOGOUT_USER_FULFILLED:
        return {...state, user: {}, loginStatus: "LOGOUT"}
      case UserConstant.USER_STATUS_REJECTED:
        return {...state, fetching: false, loginStatus: "FAILED"}
      case UserConstant.USER_STATUS_FULFILLED: {
        return {...state, fetching: false, loginStatus:"SUCCESS", user:action.payload.user}
      }
    }

    return state
}
