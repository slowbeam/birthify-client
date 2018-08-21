import React from 'react';

const LogOutButton = (props) => {

  const visitSpotifyLogout = () => {
    props.logOutUser();
    window.location = 'https://www.spotify.com/logout/';
    window.location = "http://localhost:3000/api/v1/logout";
  }


    return(
      <div className="logout-button-container">
        <button className="spotify-logout-button" onClick={visitSpotifyLogout}><div className="button-elements"><div className="logout-text">Logout </div><img className="logout-image" src="./Sign-out.svg" alt="" ></img></div></button>
      </div>


    )
}

export default LogOutButton;
