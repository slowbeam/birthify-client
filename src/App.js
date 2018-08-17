import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  state = {
    songUsers: [],
    songs: [],
    searchTerm: '',
    birthYear: ''
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


  ComponentDidMount(){
    fetch('http://localhost:3000/api/v1/songs').then(resp => resp.json()).then(resp => console.log(resp))
  }

  loadSongUsers = (userId) => {
    fetch('http://localhost:3000/api/v1/song_users').then(resp => resp.json()).then(resp => this.setState({songUsers: resp}))
  }

  renderAllSongs = () => {
    return this.state.songs.map(songObj =>
      <div key={songObj.id} className="song-card">
      <p>{songObj.title}</p>
      <p>{songObj.artist}</p>
      <p>{songObj.release_date}</p>
      </div>
    )
  }

  renderBirthYearSongs = () => {
    const songsDup = [...this.state.songs]
    const birthYearSongs = songsDup.filter(songObj => songObj.release_date.includes(this.state.birthYear))

    return birthYearSongs.map(songObj =>
      <div key={songObj.id} className="song-card">
      <p>{songObj.title}</p>
      <p>{songObj.artist}</p>
      <p>{songObj.release_date}</p>
      </div>
    )
  }


  searchForYear = (year) => {
    this.setState({birthYear: year});
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



        <div className="song-container">
        {this.renderAllSongs()}
        </div>

      </div>

    );
  }
}

export default App;
