import * as TaskConstant from './task_constant'
import { extend } from 'lodash'


export default function tasReducer(state={ 
    tasks: [],
    task: {}
  }, action) {

    switch (action.type) {
      case TaskConstant.FETCH_TASKS_FULFILLED:
        return {...state, tasks: action.payload.tasks}
      case TaskConstant.CHANGE_TASK_FULFILLED:
        return {...state, task: action.payload.task}
      case TaskConstant.DELETE_TASK_FULFILLED:{
        if(action.payload.status == 200){
          state.tasks.splice(action.index,1)
          return {...state, task: {id: action.id, deleted: true}}
        }
      }
      case TaskConstant.CREATE_TASK_FULFILLED:{
        if(action.payload.status == 200){
          return {...state, tasks: state.tasks.concat(action.payload.task)}
        }
      }
    }

    return state
}
