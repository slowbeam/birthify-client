import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import PlaylistContainer from './Containers/PlaylistContainer';
import Login from './Components/Login'
import BirthYearForm from './Components/BirthYearForm'


class App extends Component {

  state = {
    songUsers: [],
    songs: [],
    birthYear: '',
    birthSongs: []
  }

  setBirthYear = (year) => {
    this.setState({
      birthYear: year
    }, () => this.saveBirthYearSongs )
  }

  filterMatchingUser = (songUserArray, userId) => {
    const matchingArray = songUserArray.filter(Obj => Obj["user_id"] === userId)
    return matchingArray
  }


  loadSongs = () => {
    fetch('http://localhost:3000/api/v1/songs').then(resp => resp.json()).then(resp => this.setState({songs: resp, birthSongs: resp}))
  }

  loadSongUsers = (userId) => {
    fetch('http://localhost:3000/api/v1/song_users').then(resp => resp.json()).then(resp => this.setState({songUsers: resp}))
  }

  saveBirthYearSongs = () => {
    const songsDup = [...this.state.birthSongs]

    const birthYearSongs = songsDup.filter(songObj => songObj.release_date.includes(this.state.birthYear))

    this.setState({birthSongs: birthYearSongs})
  }

  componentDidMount(){
    this.loadSongs()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src='/birthify_logo_large.png' alt="" />
        </header>
        <br />
        <Login />
        <br />
        <BirthYearForm setBirthYear={this.setBirthYear}/>
        <br />
        <NavBar />
        <br />
        <PlaylistContainer songs={this.state.songs} />

      </div>

    );
  }
}

export default App;
