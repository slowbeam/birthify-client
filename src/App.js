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
    loggedInUser: null
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

  setLoggedInUser = () => {
    const foundUser = this.state.users.find(userObj => userObj["logged_in"] === true);

    if (foundUser){
      this.setState({
      loggedInUser: foundUser
      })
    }

  }

  SetUsers = (usersArray) => {
    this.setState({
      users: usersArray
    })
  }

  loadLoggedInUsersSongs = () => {

    if (this.state.loggedInUser){

      const dupArray = [...this.state.songUsers]
      console.log(dupArray)

      const filteredSongUserArray = dupArray.filter(obj => obj["user_id"] === this.state.loggedInUser.id)

      const songIdArray = filteredSongUserArray.map(songUserObj => songUserObj["song_id"]);


      const songsDup = [...this.state.songs];

      const filteredSongs = songsDup.filter(songObj => songIdArray.includes(songObj["id"]));

      this.setState({
        birthSongs: filteredSongs
      })
    }


  }

  loadAllData = () => {
    fetch('http://localhost:3000/api/v1/songs').then(resp => resp.json()).then(resp => {this.setState({songs: resp}); return fetch('http://localhost:3000/api/v1/song_users')}).then(resp => resp.json()).then(resp => {this.setState({songUsers: resp}); return fetch('http://localhost:3000/api/v1/users')}).then(resp => resp.json()).then(resp => {this.SetUsers(resp)}).then(this.setLoggedInUser).then(this.loadLoggedInUsersSongs)
  }

  renderLoginText = () => {
    if (this.state.loggedInUser){
      return <h3>Logged in as: {this.state.loggedInUser.username} </h3>
    }
    else {
      return <h3>Please Login</h3>
    }
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
        {this.renderLoginText()}
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
