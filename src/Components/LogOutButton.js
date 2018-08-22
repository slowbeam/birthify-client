import React from 'react';

const LogOutButton = (props) => {

  const visitSpotifyLogout = () => {
    props.logOutUser();
    window.location = 'https://www.spotify.com/logout/';
    window.location = "http://localhost:3000/api/v1/logout";
  }


    return(
      <div onClick={visitSpotifyLogout} className="spotify-logout-button">
        
      </div>


    )
}

export default LogOutButton;
