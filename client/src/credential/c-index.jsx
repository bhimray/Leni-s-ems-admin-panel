import React,{useContext, useReducer} from 'react'
import Login from './login'
import Signup from './signup'
import {AuthContext} from '../context/authContext'
import { Navigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const Cindex = () => {
  const {user} = useContext(AuthContext)
  // const navigate = useNavigate()

  const alteringFunction=(state, action)=>{
    switch(action.type){
      case 'login':
        return({
        showLogin:true, showLogout:false
      })
      case 'logout':
        return({
        showLogin:false, showLogout:true
      })
    }
  }
  
  const [state, dispatch] = useReducer(alteringFunction, {showLogin:true, showLogout:false})

  const handleLoginChange = (e) => {
    e.preventDefault()
    dispatch({ type: "login"})
  }
  const handleSignUpChange = (e) => {
    e.preventDefault()
    dispatch({ type: "logout"})
  }
  if (user){
    console.log(user,"user while redirecting to homepage")
    return (<Navigate to="/"/>)
  }else{
    return (
      <div>
        <>
        {
          state.showLogin?
          <Login/>
          :
          <Signup/>
        }
        </>
        <div>
          <div onClick={handleLoginChange}>Login</div>
          <div onClick={handleSignUpChange}>Sign up</div>
        </div>
      </div>
    )
       
  }

}

export default Cindex
