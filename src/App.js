import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    genres: []
  }

  loadGenres = () => {
    fetch('http://localhost:3000/api/v1/genres')
    .then(resp => resp.json())
    .then(resp => this.setState({
      genres: resp
    }))
    .then(resp => console.log(this.state.genres))

  }

  visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }

  getGenreSeeds = () => {

    this.loadGenres()
  }

  showGenres = () => {
    this.state.genres.map(genre => <p>genre.name</p>)
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

        <button onClick={this.getGenreSeeds}>get genre seeds</button>
        {this.showGenres()}
        </p>
      </div>

    );
  }
}

export default App;
