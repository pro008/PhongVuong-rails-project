import * as UserConstant from './user_constant'
import { extend } from 'lodash'


export default function userReducer(state={ 
    fetching: false,
    status: null,
    checkUser: false,
    message: "",
    loginStatus: "NOT_LOGGED_IN",
    user: {} 
  }, action) {

    switch (action.type) {
      case UserConstant.USER_STATUS:
      case UserConstant.LOGGIN_USER:
      case UserConstant.LOGOUT_USER:
      case UserConstant.REGISTRY_USER:
        return {...state, fetching: true}
      case UserConstant.LOGGIN_USER_REJECTED:
      case UserConstant.REGISTRY_USER_REJECTED:
        return {...state, fetching: false, message: action.payload.message}
      case UserConstant.LOGGIN_USER_FULFILLED:
      case UserConstant.REGISTRY_USER_FULFILLED: {
        return {...state, fetching: false, message: action.payload.message, checkUser: true,
                          user: action.payload.user, status: action.payload.status}
      }
      case UserConstant.LOGOUT_USER_FULFILLED:
        return {...state}
      case UserConstant.USER_STATUS_REJECTED:
        return {...state, fetching: false, checkUser: true}
      case UserConstant.USER_STATUS_FULFILLED: {
        return {...state, fetching: false, checkUser:true, user:action.payload.user}
      }
    }

    return state
}
