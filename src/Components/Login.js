import React from 'react';

const Login = (props) => {

  const visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }


    return(
      <button className="spotify-login-button" onClick={visitSpotifyLogin}>{props.text}</button>
    )
}

export default Login;
