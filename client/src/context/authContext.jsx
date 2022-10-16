import {React,createContext,useReducer } from 'react'
import jwtDecode from "jwt-decode";
import { decode } from "punycode";

const initialState={ // this is the initial state of the user
    user:null
}
if (localStorage.getItem('token')){// checking whether the token valid or expired if yes then assigning the token to the user
    const decodeToken = jwtDecode(localStorage.getItem('token'));
    
    if (decodeToken.exp*1000 < Date.now()){
        localStorage.removeItem('token')
    }else{
        initialState.user= decodeToken;
    }
}

const AuthContext = createContext({ // creating the context and initializing the intial value for the variables
    user:null,
    login:(userData)=>{},//this function belongs to the function inside the authprovider
    logout:()=>{}
})

function  authReducer(state, action){ // creating reducer function to update the value of the state
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user:action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user:null
            }
        default:
            return state
    }
}

function AuthProvider(props){ // creating function to login and logout the user from browser
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData)=>{ // logging  the user from the login details and storing token in browser with the help of reducer function
        // console.log(userData, 'this is returned value')
        localStorage.setItem('token', userData.token)
        dispatch({
            type:'LOGIN',
            payload:userData
        })
    }
    const logOut = ()=>{ //logging out the user and removing the storage from the browser to logout the user
        localStorage.removeItem('token')
        dispatch({
            type:'LOGOUT',
        })
    }

    return(
        <AuthContext.Provider // creating context provider so that value can be trasferred into other coomponent
        value={{user:state.user, login, logOut}}
        {...props}
        />
    )
}

export {AuthContext, AuthProvider}
 