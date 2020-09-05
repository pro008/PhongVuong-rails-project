import axios from "axios";
import * as TaskConstant from '../reducers/task_constant'


export function fetchTasks() {
  return function(dispatch) {
    dispatch({type: TaskConstant.FETCH_TASKS});
    axios.get(`http://localhost:3000/tasks`, { withCredentials: true })
      .then((response) => {
        dispatch({type: TaskConstant.FETCH_TASKS_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: TaskConstant.FETCH_TASKS_REJECTED, payload: err})
      })
  }
}

export function changeProgress(task_id, progress) {
  let stage = {progress: progress}
  return function(dispatch) {
    dispatch({type: TaskConstant.CHANGE_TASK});
    axios.patch(`http://localhost:3000/tasks/${task_id}`, stage, { withCredentials: true })
      .then((response) => {
        dispatch({type: TaskConstant.CHANGE_TASK_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: TaskConstant.CHANGE_TASK_REJECTED, payload: err})
      })
  }
}

export function changePriority(task_id, priority) {
  let stage = {priority: priority}
  return function(dispatch) {
    dispatch({type: TaskConstant.CHANGE_TASK});
    axios.patch(`http://localhost:3000/tasks/${task_id}`, stage, { withCredentials: true })
      .then((response) => {
        dispatch({type: TaskConstant.CHANGE_TASK_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: TaskConstant.CHANGE_TASK_REJECTED, payload: err})
      })
  }
}

export function createTask(task) {
  return function(dispatch) {
    dispatch({type: TaskConstant.CREATE_TASK});
    axios.post(`http://localhost:3000/tasks`, task, { withCredentials: true })
      .then((response) => {
        dispatch({type: TaskConstant.CREATE_TASK_FULFILLED, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: TaskConstant.CREATE_TASK_REJECTED, payload: err})
      })
  }
}

export function deleteTask(task_id, index) {
  return function(dispatch) {
    dispatch({type: TaskConstant.DELETE_TASK});
    axios.delete(`http://localhost:3000/tasks/${task_id}`, { withCredentials: true })
      .then((response) => {
        dispatch({type: TaskConstant.DELETE_TASK_FULFILLED, payload: response.data, index: index, id: task_id})
      })
      .catch((err) => {
        dispatch({type: TaskConstant.DELETE_TASK_REJECTED, payload: err})
      })
  }
}