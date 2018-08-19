import React from 'react';

const CreatePlaylist = (props) => {

  const visitCreatePlaylist = () => {
    window.location='http://localhost:3000/api/v1/create-playlist';
  }

    return(
      <button className="create-new-playlist-button" onClick={visitCreatePlaylist}>Create New Playlist On Spotify</button>
    )
}

export default CreatePlaylist;
