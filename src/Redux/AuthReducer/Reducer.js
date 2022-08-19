import { LOGIN_FAILURE, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS, PROFILE_FAILURE, PROFILE_LOADING, PROFILE_SUCCESS, REGISTER_FAILURE, REGISTER_LOADING, REGISTER_SUCCESS } from "./ActionType"

let token=localStorage.getItem("token")

const initialState={
    isAuth:token ? true : false,
    token:token || "",
    isLoading:false,
    isError:false,
    profile:{}
}


export const reducer=(state=initialState,action)=>{
  const {type,payload}=action
  switch(type){
    case REGISTER_LOADING:{
      return {
        ...state,
        isLoading:true,
        isError:false
      }
    }
    case REGISTER_SUCCESS:{
      
      return {
        ...state,
        isLoading:false,
        isError:false,
      }
    }
    case REGISTER_FAILURE:{
      return {
        ...state,
        isLoading:false,
        isError:true
      }
    }



    case LOGIN_LOADING:{
      return {
        ...state,
        isLoading:true,
        isError:false
      }
    }
    case LOGIN_SUCCESS:{
      localStorage.setItem("token",payload)
      return {
        ...state,
        isLoading:false,
        isError:false,
        token:payload,
        isAuth:true
      }
    }
    case LOGIN_FAILURE:{
      return {
        ...state,
        isLoading:false,
        isError:true,
        isAuth:false,
        token:""
      }
    }

    case LOGOUT_SUCCESS:{
      return {
       isAuth:false
      }
    }



    case PROFILE_LOADING:{
      return {
        ...state,
        isLoading:true,
        isError:false
      }
    }
    case PROFILE_SUCCESS:{
      return {
        ...state,
        isLoading:false,
        isError:false,
        profile:payload
      }
    }
    case PROFILE_FAILURE:{
      return {
        ...state,
        isLoading:false,
        isError:true,
      
      }
    }

    default:{
        return state
    }
  }
}