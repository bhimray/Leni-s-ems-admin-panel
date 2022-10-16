import React from 'react';
import {useReducer, useNavigate} from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import {useContext, useState} from 'react'
import { AuthContext } from '../context/authContext';

const initialState = {name:'', email:'', password:''}

// const FORM_QUERY = gql`
//     mutation createUser($createUserInputData:createUserInputData) {
//       createUser(createUserInput:$createUserInputData ) {
//         name
//         email
//       }
// }
// `
const FORM_QUERY = gql`
    mutation createUser($name:String!, $email:String!, $password:String) {
      createUser(name:$name, email:$email, password:$password) {
        name
        email
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
  
const Signup = () => {

  const context = useContext(AuthContext)
  // let navigate = useNavigate()
  const [errors, setErrors] = useState('')
  const [state, dispatch] = useReducer(reducer,initialState)
  
  const variables = {
    name: state.name,
    email:state.email,
    password:state.password,
  }
  const [submitFormData, {data, loading, error }] = useMutation(FORM_QUERY,{
    variables:{
      name: state.name,
      email:state.email,
      password:state.password,
    }
  });
  if (loading) return console.log("loading");
  if (error) return console.log(error);
  if (data) return console.log(data,"returned data from signup")
  return (
    <div>
        <form onSubmit={async(e)=>{e.preventDefault();
        console.log(variables);
        submitFormData()}} action="">
            <input placeholder='username' type="text" onChange={(e) => dispatch({type: 'name',payload:e.target.value})}/>
            <input placeholder='email' type="text" onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}/>
            <input placeholder='password' type="text" onChange={(e) => dispatch({type: 'password', payload:e.target.value})}/>
            <button type="submit" className="submitButton">submit</button>
        </form>
    </div>
  )
}

export default Signup