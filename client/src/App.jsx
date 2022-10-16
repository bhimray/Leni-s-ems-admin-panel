import React,{useContext, useEffect} from 'react';
import './App.css';
import FTHeading from './components/f-top/ft-heading';
import FBIndex from './components/f-bottom/fb-index';
import Cindex from './credential/c-index';
import {ApolloProvider, ApolloClient,createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { AuthProvider, AuthContext } from './context/authContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainBoard from './components/mainBoard';

//httplink.....
const htttpLink = createHttpLink({
  uri:'http://localhost:8000'
})

//authlink
const authLink = setContext((_, {headers})=>{
  return {
    headers:{
      ...headers,
      authorization:localStorage.getItem("token")|| ""
    }
  }
})
const queryClient = new ApolloClient({
  link:authLink.concat(htttpLink),
  cache:new InMemoryCache(),
})

// useEffect({

// },[user])
function App() {
  const {user} = useContext(AuthContext)
  console.log(user, "in the app.jsx")
  return (
    <AuthProvider>
      <ApolloProvider client ={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainBoard/>}/>
            <Route path='/signin' element={<Cindex/>}/>
          </Routes>
        </BrowserRouter> 
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
