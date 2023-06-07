import axios from "axios";
import { FAILURE_DATA, GET_CHARTS_DATA, GET_COUNTS_DATA, GET_SUCCESS_DATA, POST_SUCCESS_DATA } from "./ActionTypes";

export const postData = (formData,navigate) => async (dispatch) => {
    try {
        let response = await axios.post('https://techlabs-backend.onrender.com/project/add', {
            ...formData
        });
        let data = await response.data;
        console.log(data, "STATUS");
        if (data.success===true) {
            dispatch({ type: POST_SUCCESS_DATA})
            navigate("/project-listing")
        }
        else {
            dispatch({ type: FAILURE_DATA })
        }

    }
    catch (err) {
        console.log(err);
        dispatch({ type: FAILURE_DATA })
    }
}

export const getAllData = (page,limit,text,sort) => async (dispatch) => {
    try {
        let response;
        
        if(text!==""){
            response = await axios.get(`https://techlabs-backend.onrender.com/project/${text}?sort=${sort}&page=${page}&limit=${limit}`);
        }
        else{
            response = await axios.get(`https://techlabs-backend.onrender.com/project?sort=${sort}&page=${page}&limit=${limit}`);
        }

        let data = await response.data;
        console.log(data,"getdata");
        dispatch({type:GET_SUCCESS_DATA,payload:data})
    }
    catch(err){
        console.log(err);
    }
}

export const updateData = (id,obj,page,limit) => async (dispatch) => {
    try{
       let response = await axios.patch(`https://techlabs-backend.onrender.com/project/edit/${id}`,obj);
       let data = await response.data;
       console.log(data);
       dispatch(getAllData(page,limit,""))
    }
    catch(err){
        console.log(err);
    }
}

export const getAllCounts = () => async (dispatch) => {
    try{
     let response = await axios.get('https://techlabs-backend.onrender.com/project/counts');
     let data = response.data;
     console.log(data);
     dispatch({type:GET_COUNTS_DATA,payload:{
        total:data.totalData,
        closed:data.closedData.length,
        cancelled:data.cancelledData.length,
        running:data.runningData.length,
        closure : data.closureDelay.length
     }})
    }
    catch(err){
        console.log(err);
    }
}

export const getChartsData = () => async (dispatch) => {
    try{
        let response = await axios.get('https://techlabs-backend.onrender.com/project/charts');
        let data = await response.data;
        console.log(data,"charts");
        dispatch({type:GET_CHARTS_DATA,payload:{
            chartsTotal:data.chartsTotal,
            chartsClosed:data.chartsClosed
        }})
    }
    catch(err){
        console.log(err);
    }
}