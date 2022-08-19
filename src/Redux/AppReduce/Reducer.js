import { ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS } from "./ActionType"

const initialState={
    tasks:[],
    isLoading:false,
    isError:false
}

export const reducer=(state=initialState,action)=>{
  const {type,payload}=action
  switch(type){
    case GET_TASK_REQUEST:{
      return {
        ...state,
        isLoading:true,
        isError:false
      }
    }

    case GET_TASK_SUCCESS:{
      return {
        ...state,
        isLoading:false,
        isError:false,
        tasks:payload
      }
    }

    case GET_TASK_FAILURE:{
      return {
        ...state,
        isLoading:false,
        isError:true
      }
    }



    case ADD_TASK_REQUEST:{
      return {
        ...state,
        isLoading:true,
        isError:false
      }
    }

    case ADD_TASK_SUCCESS:{
      return {
        ...state,
        isLoading:false,
        isError:false,
        tasks:payload
      }
    }

    case ADD_TASK_FAILURE:{
      return {
        ...state,
        isLoading:false,
        isError:true
      }
    }

    default:{
        return state
    }
  }
}