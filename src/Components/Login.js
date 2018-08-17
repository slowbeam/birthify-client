import React from 'react';

const Login = () => {

  const visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }


    return(
      <button className="spotify-login-button" onClick={visitSpotifyLogin}>Login to Spotify</button>
    )
}

export default Login;
