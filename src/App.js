import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import PlaylistContainer from './Containers/PlaylistContainer';
import Login from './Components/Login'
import BirthYearForm from './Components/BirthYearForm'


class App extends Component {

  state = {
    users: [],
    songs: [],
    songUsers: [],
    birthYear: '',
    birthSongs: [],
    loggedInUserId: null
  }

  setBirthYear = (year) => {
    this.setState({
      birthYear: year
    }, () => this.saveBirthYearSongs )
  }

  filterMatchingUser = (songUserArray, userId) => {
    const dupArray = [...songUserArray]
    return dupArray.filter(obj => obj["user_id"] === userId)

  }

  setLoggedInUser = (usersArray) => {

  }

  SetUsers = (usersArray) => {
      const foundUser = usersArray.find(userObj => userObj["logged_in"] === true);
      this.setState({
        users: usersArray,
        loggedInUserId: foundUser["id"]
      })


  }

  loadLoggedInUsersSongs = () => {

    const dupArray = [...this.state.songUsers]

    const filteredSongUserArray = dupArray.filter(obj => obj["user_id"] === this.state.loggedInUserId)

    console.log(filteredSongUserArray)

    const songIdArray = filteredSongUserArray.map(songUserObj => songUserObj["song_id"]);


    const songsDup = [...this.state.songs];

    const filteredSongs = songsDup.filter(songObj => songIdArray.includes(songObj["id"]));

    this.setState({
      birthSongs: filteredSongs
    })
  }

  loadAllData = () => {
    fetch('http://localhost:3000/api/v1/songs').then(resp => resp.json()).then(resp => {this.setState({songs: resp}); return fetch('http://localhost:3000/api/v1/song_users')}).then(resp => resp.json()).then(resp => {this.setState({songUsers: resp}); return fetch('http://localhost:3000/api/v1/users')}).then(resp => resp.json()).then(resp => {this.SetUsers(resp)}).then(this.loadLoggedInUsersSongs)
  }

  loadUsers = () => {
    fetch('http://localhost:3000/api/v1/users').then(resp => resp.json()).then(resp => {this.findAndSetUsers(resp)})
  }


  loadSongs = () => {
    fetch('http://localhost:3000/api/v1/songs').then(resp => resp.json()).then(resp => this.setState({songs: resp}))
  }

  loadSongUsers = () => {
    fetch('http://localhost:3000/api/v1/song_users').then(resp => resp.json()).then(resp => this.setState({songUsers: resp}))
  }

  componentDidMount() {
    this.loadAllData()

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
        <PlaylistContainer songs={this.state.birthSongs} />

      </div>

    );
  }
}

export default App;
