import { combineReducers } from "redux"

import UserReducer from "./userReducer"
import TaskReducer from "./taskReducer"
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  UserReducer,
  TaskReducer,
  form: formReducer,
})
  