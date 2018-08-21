import React from 'react';

const LogOutButton = (props) => {

  const visitSpotifyLogout = () => {
    window.location='https://www.spotify.com/logout/';
  }


    return(
      <div>
      <button className="spotify-logout-button" onClick={visitSpotifyLogout}><img className="logout-image" src="./Sign-out.svg"></img></button>
      </div>

    )
}

export default LogOutButton;
