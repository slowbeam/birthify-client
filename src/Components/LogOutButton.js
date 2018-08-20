import React from 'react';

const LogOutButton = (props) => {

  const visitSpotifyLogout = () => {
    window.location='https://www.spotify.com/logout/';
  }


    return(
      <div>
      <button className="spotify-logout-button" onClick={visitSpotifyLogout}>log out</button>
      </div>

    )
}

export default LogOutButton;
