import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from './../utility';

const intialState = {
    token:null,
    userId:null,
    error:null,
    loading:false
}

const reducer = (state=intialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return updateObject(state,{error:null,loading:true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state,{error:null,loading:false,token:action.idToken,userId:action.userId});
        case actionTypes.AUTH_FAIL:
            return updateObject(state,{error:action.error,loading:false});
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state,{token:null,userId:null});
        default:
            return state;
    }
}

export default reducer;