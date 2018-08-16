import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={this.visitSpotifyLogin}>Login to Spotify</button>

        </p>
      </div>

    );
  }
}

export default App;
