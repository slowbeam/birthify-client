import React from 'react';

const Login = (props) => {

  const visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }

    return(
      <div className="login-container">
        <div onClick={visitSpotifyLogin} className="spotify-login-button" >
        </div>
      </div>


    )
}

export default Login;
