import { legacy_createStore,applyMiddleware,combineReducers } from "redux";
import thunk from 'redux-thunk'
import { ProjectReducer } from "./project/Reducer";
import { userReducer } from "./user/userReducer";

let rootReducer = combineReducers({
    project:ProjectReducer,
    user:userReducer
})

let store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export default store