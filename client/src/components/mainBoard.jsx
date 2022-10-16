import React,{useContext} from 'react'
import FBIndex from './f-bottom/fb-index'
import FTHeading from './f-top/ft-heading'
import {AuthContext} from '../context/authContext'
import { Navigate, NavigationType } from 'react-router-dom'

const MainBoard = () => {
    const {user} = useContext(AuthContext)
    if (user){
        console.log(user,"user while redirecting to homepage")
        return (
            <div>
                <FBIndex/>
                <FTHeading/>
            </div>
        )
    }else{
        return (<Navigate to="/signin"/>)
    }
}

export default MainBoard