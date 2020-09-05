import axios from "axios";
import * as UserConstant from '../reducers/user_constant'


export function submitRegistration(user) {
  return function(dispatch) {
    dispatch({type: UserConstant.REGISTRY_USER});
    axios.post(`http://localhost:3000/registrations`, user, { withCredentials: true })
      .then((response) => {
        dispatch({type: UserConstant.REGISTRY_USER_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: UserConstant.REGISTRY_USER_REJECTED, payload: err})
      })
  }
}

export function submitLogin(user) {
  return function(dispatch) {
    dispatch({type: UserConstant.LOGGIN_USER});
    axios.post(`http://localhost:3000/sessions`, user, { withCredentials: true })
      .then((response) => {
        dispatch({type: UserConstant.LOGGIN_USER_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: UserConstant.LOGGIN_USER_REJECTED, payload: err})
      })
  }
}

export function userLogout() {
  return function(dispatch) {
    dispatch({type: UserConstant.LOGOUT_USER});
    axios.delete(`http://localhost:3000/sessions/logout`, { withCredentials: true })
      .then((response) => {
        dispatch({type: UserConstant.LOGOUT_USER_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: UserConstant.LOGOUT_USER_REJECTED, payload: err})
      })
  }
}

export function userStatus() {
  return function(dispatch) {
    dispatch({type: UserConstant.USER_STATUS});
    axios.get(`http://localhost:3000/sessions/logged_in`, { withCredentials: true })
      .then((response) => {
        dispatch({type: UserConstant.USER_STATUS_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: UserConstant.USER_STATUS_REJECTED, payload: err})
      })
  }
}