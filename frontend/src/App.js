import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

require('dotenv').config()

class App extends React.Component {
  render() {
    return (
        <main class='App'>
          <h1> Karmagarden </h1>
          <div>Even more text here.</div>
        </main>
      )
  }
}

export default App;
