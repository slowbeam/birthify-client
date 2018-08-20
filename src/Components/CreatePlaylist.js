import React from 'react';

const CreatePlaylist = (props) => {

  const visitCreatePlaylist = () => {
    window.location='http://localhost:3000/api/v1/create-playlist';
  }

    return(
      <div>
        <button className="create-new-playlist-button" onClick={visitCreatePlaylist}>Create New Playlist On Spotify</button>
    </div>

    )
}

export default CreatePlaylist;
