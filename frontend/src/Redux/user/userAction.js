import axios from "axios";
import { LOGIN_FAILURE_DATA, LOGIN_SUCCESS_DATA } from "./userActionTypes";

export const loginUser = (form,navigate) => async(dispatch) => {
    try{
      let res = await axios.post('https://techlabs-backend.onrender.com/user/login',form);
      let userdata = await res.data;
      console.log(userdata)
      if(userdata.success){
         dispatch({type:LOGIN_SUCCESS_DATA, payload : userdata.message})
         navigate("/dashboard")
         let token = userdata.token
         localStorage.setItem('token-techprime',JSON.stringify(token))
      }
      else{
        dispatch({type:LOGIN_FAILURE_DATA, payload : userdata.message})
      }
    }
    catch(err){
     console.log(err);
    }
 }
 