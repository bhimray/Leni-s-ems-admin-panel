import React from 'react';
import logo from './logo.svg';
import './App.css';
import FTHeading from './components/f-top/ft-heading';
import FBIndex from './components/f-bottom/fb-index';
import Cindex from './credential/c-index';
// import { QueryClient, QueryClientProvider } from 'react-query';
import {ApolloProvider, ApolloClient,createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { AuthProvider } from './context/authContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './credential/login';
import Signup from './credential/signup';

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

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client ={queryClient}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>This is Home Page</h1>}/>
            <Route path='/signin' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
        </BrowserRouter>

        <div className="App">
          <FTHeading/>
          <FBIndex/>
          <Cindex/>
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
