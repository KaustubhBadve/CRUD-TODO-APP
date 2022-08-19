import { REGISTER_FAILURE } from "../AuthReducer/ActionType"
import { ADD_SUBTASK_FAILURE, ADD_SUBTASK_REQUEST, ADD_SUBTASK_SUCCESS, ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESS, DELETE_SUBTASK_FAILURE, DELETE_SUBTASK_REQUEST, DELETE_SUBTASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./ActionType"
import axios from 'axios'

export const getTask=()=>(dispatch)=>{
    dispatch({type:GET_TASK_REQUEST})

    return axios.get("http://localhost:5000/tasks").then((r)=>{
        dispatch({type:GET_TASK_SUCCESS,payload:r.data})
    })
    .catch((e)=>{
        dispatch({type:GET_TASK_FAILURE,payload:e})
    })
}


export const updateTask=(id,payload)=>(dispatch)=>{
    dispatch({type:UPDATE_TASK_REQUEST})

    return axios.patch(`http://localhost:5000/tasks/${id}`,payload).then((r)=>{
        dispatch({type:UPDATE_TASK_SUCCESS,payload:r.data})
    })
    .catch((e)=>{
        dispatch({type:UPDATE_TASK_FAILURE,payload:e})
    })
}


export const addSubTask=(id,payload)=>(dispatch)=>{
    dispatch({type:ADD_SUBTASK_REQUEST})

    return axios.patch(`http://localhost:5000/tasks/${id}`,payload).then((r)=>{
        dispatch({type:ADD_SUBTASK_SUCCESS,payload:r})
    })
    .catch((e)=>{
        dispatch({type:ADD_SUBTASK_FAILURE,payload:e})
    })
}



export const addTask=(payload)=>(dispatch)=>{
    dispatch({type:ADD_TASK_REQUEST})

    return axios.post(`http://localhost:5000/tasks`,payload).then((r)=>{
        dispatch({type:ADD_TASK_SUCCESS,payload:r.data})
    })
    .catch((e)=>{
        dispatch({type:ADD_TASK_FAILURE,payload:e})
    })
}


export const deleteSubTask=(id,payload)=>(dispatch)=>{
    dispatch({type:DELETE_SUBTASK_REQUEST})

    return axios.patch(`http://localhost:5000/tasks/${id}`,payload).then((r)=>{
        dispatch({type:DELETE_SUBTASK_SUCCESS,payload:r})
    })
    .catch((e)=>{
        dispatch({type:DELETE_SUBTASK_FAILURE,payload:e})
    })
}