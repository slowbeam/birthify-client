import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  state = {
    songUsers: [],
    songs: [],
    searchTerm: ''
  }


  visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }

  // loadGenres = () => {
  //   fetch('http://localhost:3000/api/v1/genres')
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     genres: data
  //   }))
  //   .then(resp => console.log(this.state.genres))
  //
  // }

  // getGenreSeeds = () => {
    // window.location='http://localhost:3000/api/v1/load-genre-seeds';
  //   this.loadGenres()
  // }

  // showGenres = () => {
  //   this.state.genres.map(genre => {return genre.name})
  // }

  filterMatchingUser = (songUserArray, userId) => {
    const matchingArray = songUserArray.filter(Obj => Obj["user_id"] === userId)
    return matchingArray
  }

  loadSongUsers = (userId) => {
    fetch('http://localhost:3000/api/v1/song_users').then(resp => resp.json()).then(resp => this.setState({songUsers: resp}))
  }

  loadSongs = () => {
    fetch('http://localhost:3000/api/v1/songs').then(resp => resp.json()).then(resp => this.setState({songs: resp}))
  }

  renderSongs = () => {
    return this.state.songs.map(songObj =>
      <div key={songObj.id} className="song-card">
      <p>{songObj.title}</p>
      <p>{songObj.artist}</p>
      <p>{songObj.release_date}</p>
      </div>
    )
  }


  searchForYear = (year) => {
    window.location='http://localhost:3000/api/v1/search/?year=' + year;
  }

  handleSearch = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Birthify</h1>
        </header>
        <div className="home-container">
        <button className="spotify-login-button" onClick={this.visitSpotifyLogin}>Login to Spotify</button>
        <p>please enter your birth year:</p>
        <input value={this.state.searchTerm} onChange={this.handleSearch} />
        <button className="submit-year-button" onClick={() => this.searchForYear(this.state.searchTerm)}>submit</button>
        </div>

        {/*{this.loadSongUsers(1)}
        {this.loadSongs()}*/}
        
        <div className="song-container">
        {this.renderSongs()}
        </div>

      </div>

    );
  }
}

export default App;
