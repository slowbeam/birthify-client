import React, { Component } from 'react';
import './App.css';
import PlaylistContainer from './Containers/PlaylistContainer';
import SideBar from './Containers/SideBar'
import Login from './Components/Login'
import BirthYearForm from './Components/BirthYearForm'
import LogOutButton from './Components/LogOutButton'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      songs: [],
      songUsers: [],
      birthYear: '',
      birthSongs: [],
      loggedInUser: null,
      deviceId: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      albumArt: "",
      playing: false,
      position: 0,
      duration: 0
    };

    this.playerCheckInterval = null;
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

  checkForPlayer(){
    if (this.state.loggedInUser){
      const token = this.state.loggedInUser["access_token"];


      if (window.Spotify !== undefined){
        clearInterval(this.playerCheckInterval);
        this.player = new window.Spotify.Player({
          name: "Birthify Spotify Player",
          getOAuthToken: cb => { cb(token); }
        })
        this.createEventHandlers()
        this.player.connect();
      }
    }

  }

  createEventHandlers(){
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e)
    });
    this.player.on('account_error', e => {console.error(e); });
    this.player.on('playback_error', e => {console.error(e); });
    this.player.on('player_state_changed', state => this.onStateChanged(state));
    this.player.on('ready', async data => {
      let { device_id } = data;
      await this.setState({ deviceId: device_id});
      this.transferPlaybackHere();

    });
  }

  onStateChanged(state) {
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const albumArt = currentTrack.album.images[0].url
      console.log(albumArt)
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing,
        albumArt
      });
    }

  }

  onPrevClick = () => {
    this.player.previousTrack();
  }

  onPlayClick = () => {
    this.player.togglePlay();
  }

  onNextClick = () => {
    this.player.nextTrack();
  }

  transferPlaybackHere = () => {


    const { deviceId, loggedInUser } = this.state;
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${loggedInUser.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": false
      }),
    }).then(this.loadCurrentPlaylist)
  }

  loadCurrentPlaylist = () => {
    const playUrl = "https://api.spotify.com/v1/me/player/play?device_id=" + this.state.deviceId
    fetch('http://localhost:3000/api/v1/users').then(resp => resp.json())
    .then(resp => {this.SetUsers(resp)}).then(this.setLoggedInUser)
    .then(() => {return fetch( playUrl, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${this.state.loggedInUser.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "context_uri": this.state.loggedInUser.playlist_uri
      })
    })
  })
}


  componentDidMount() {
    this.loadAllData()
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)

  }

  Login = () => {
    return (
      <Login text="Login to Spotify" />
    )
  }

  Welcome = () => {
    return (
      <BirthYearForm setBirthYear={this.setBirthYear}/>
    )
  }

  Playlist = () => {
    return (
      <div className="playlist-page-container">
        <SideBar artistName={this.state.artistName} trackName={this.state.trackName} albumName={this.state.albumName} albumArt={this.state.albumArt} playing={this.state.playing} onPrevClick={this.onPrevClick} onPlayClick={this.onPlayClick} onNextClick={this.onNextClick}/>
        <PlaylistContainer songs={this.state.birthSongs} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-buffer"></div>
          <img className="App-logo" src='/birthify_logo_large.png' alt="" />


          {this.state.loggedInUser ? <LogOutButton /> : <div className="logout-buffer"></div>}
        </header>
        <Router>
          <React.Fragment>
            <Route exact path="/login" render={this.Login} />
            <Route exact path="/welcome" render={this.Welcome} />
            <Route exact path="/playlist" render={this.Playlist} />
          </React.Fragment>

        </Router>

      </div>

    );
  }
}

export default App;
