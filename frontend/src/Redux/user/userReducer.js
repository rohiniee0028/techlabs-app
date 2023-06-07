import { LOGIN_FAILURE_DATA, LOGIN_REQUEST_DATA, LOGIN_SUCCESS_DATA} from "./userActionTypes";

const initialState = {
    isLoading:false,
    isError:false,
    message:""
}

export const userReducer = (state=initialState,action) =>{
  switch(action.type){
    case LOGIN_REQUEST_DATA:{
        return {
            ...state,
            isLoading:true,
            isError:false,
        } 
    }
    case LOGIN_SUCCESS_DATA: {
		return {
			...state,
            isLoading : false,
            isError : false,
            message:action.payload
		};
	}
    case LOGIN_FAILURE_DATA:{
        return {
            ...state,
            isLoading:false,
            isError:true,
            message:action.payload
        } 
    }
    default: {
        return state;
    }
  }
}