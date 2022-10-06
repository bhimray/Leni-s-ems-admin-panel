import React from 'react';
import logo from './logo.svg';
import './App.css';
import FTHeading from './components/f-top/ft-heading';
import FBIndex from './components/f-bottom/fb-index';

function App() {
  return (
    <div className="App">
      <FTHeading/>
      <FBIndex/>
    </div>
  );
}

export default App;
