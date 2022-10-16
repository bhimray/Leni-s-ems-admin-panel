import React,{useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import {useNavigate} from 'react-router-dom'

type Props = {}

const FTHeading = (props: Props) => {
  const {user, logOut} = useContext(AuthContext)
  const navigate = useNavigate()
  const clearUser=()=>{
    console.log(user,"user")
    logOut()
    navigate('/signin',{replace:true})
    console.log(user,"user")
  }
  return (
    <div>
      <div>FTHeading</div>
      {user? <button onClick={clearUser}>Logout</button>:null}
    </div>
  )
}

export default FTHeading