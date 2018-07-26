import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () =>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) =>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:authData.idToken,
        userId:authData.localId
    }
}

export const authFail = (error) =>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logOut = () =>{
    return {
        type:actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logOut());
        },expirationTime*1000)
    }
}

export const autheticateUser = (email,password,isSignUp) =>{
    return dispatch=>{
        dispatch(authStart());
        const authdata = {
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB39urpyOYtDCiEU-sY1W1LrLiDTng7HTQ';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB39urpyOYtDCiEU-sY1W1LrLiDTng7HTQ';
        }
        axios.post(url,authdata)
                .then((response)=>{
                    console.log(response);
                    dispatch(authSuccess(response.data));
                    dispatch(checkAuthTimeout(response.data.expiresIn))
                })
                .catch((err)=>{
                    console.log(err);
                    dispatch(authFail(err.response.data.error));
                })
    }
}