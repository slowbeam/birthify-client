import React from 'react';

const CreatePlaylist = (props) => {

  const visitCreatePlaylist = () => {
    window.location='http://localhost:3000/api/v1/create-playlist';
  }

  const visitLoadPlaylist = () => {
    window.location='http://localhost:3000/api/v1/load-playlist/?device=' + props.deviceId ;
  }

    return(
      <div>
        <button className="create-new-playlist-button" onClick={visitCreatePlaylist}>Create New Playlist On Spotify</button>
        <button className="create-new-playlist-button" onClick={visitLoadPlaylist}> Load Playlist </button>
    </div>

    )
}

export default CreatePlaylist;
