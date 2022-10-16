import React from 'react';
import {useReducer,useEffect} from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import {useContext, useState} from 'react'
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const initialState = {name:'', email:'', password:''}

const FORM_QUERY = gql`
mutation login($email: String!, $password:String) {
  login(email: $email, password:$password) {
    user
    token
    tokenExpiration
  }
}
`
const reducer=(state, action)=>{
    switch (action.type) {
      case 'name':
        return {...state, name:action.payload};
      case 'email':
        return {...state, email:action.payload};
    case 'password':
        return {...state, password:action.payload};
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }
  
const Login = () => {
    const context = useContext(AuthContext)
    let navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [state, dispatch] = useReducer(reducer,initialState)
    
    const variables = {
      email:state.email,
      password:state.password,
    }
    const[submitFormData, {data,loading, error }] = useMutation(FORM_QUERY,
      {
      variables:{
        email:state.email,
        password:state.password,
      }
    });
    
    if (loading) console.log("Loading")
    if (error) console.log("error fetching the data")
    useEffect(() => {
      if (data) {
        context.login(data)
        console.log(data, "user logged in data")
        navigate("/");
      }
    }, [data]);

  return (
    <div>
        <form onSubmit={(e) =>{e.preventDefault();submitFormData()}} action="">
            {/* <input placeholder='username' type="text" onChange={(e) => dispatch({type: 'name',payload:e.target.value})}/> */}
            <input placeholder='email' type="text" onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}/>
            <input placeholder='password' type="text" onChange={(e) => dispatch({type: 'password', payload:e.target.value})}/>
            <button type="submit" className="submitButton">submit</button>
        </form>
    </div>
  )
}

export default Login